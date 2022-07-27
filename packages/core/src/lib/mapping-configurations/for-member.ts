import { getMetadataMap } from '../symbols';
import type {
    Dictionary,
    MappingConfiguration,
    MappingProperty,
    MemberMapReturn,
    PreConditionReturn,
    Selector,
    SelectorReturn,
} from '../types';
import { MappingClassId, MetadataClassId, NestedMappingPair } from '../types';
import { getMemberPath } from '../utils/get-member-path';
import { getFlatteningPaths, getPath } from '../utils/get-path';
import { isPrimitiveArrayEqual } from '../utils/is-primitive-array-equal';

export function forMember<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TMemberType = SelectorReturn<TDestination>
>(
    selector: Selector<TDestination, TMemberType>,
    ...fns: [
        preCondOrMapMemberFn:
            | PreConditionReturn<TSource, TDestination, TMemberType>
            | MemberMapReturn<TSource, TDestination, TMemberType>
            | undefined,
        mapMemberFn?: MemberMapReturn<TSource, TDestination, TMemberType>
    ]
): MappingConfiguration<TSource, TDestination> {
    let [preCondOrMapMemberFn, mapMemberFn] = fns;
    const memberPath = getMemberPath(selector);

    // reassign mapMemberFn and preCond
    if (mapMemberFn == null) {
        mapMemberFn = preCondOrMapMemberFn as MemberMapReturn<
            TSource,
            TDestination,
            TMemberType
        >;
        preCondOrMapMemberFn = undefined;
    }

    const mappingProperty: MappingProperty<TSource, TDestination> = [
        memberPath,
        [
            mapMemberFn,
            preCondOrMapMemberFn as PreConditionReturn<
                TSource,
                TDestination,
                TMemberType
            >,
        ],
    ];

    return (mapping) => {
        // TODO: consolidate this logic with the one in createInitialMapping
        const [sourceIdentifier, destinationIdentifier] =
            mapping[MappingClassId.identifiers];
        const mapper = mapping[MappingClassId.mapper];
        const namingConventions = mapping[MappingClassId.namingConventions];
        const [sourceObject] = mapping[MappingClassId.identifierMetadata];

        const metadataMap = getMetadataMap(mapper);
        const destinationMetadata =
            metadataMap.get(destinationIdentifier) || [];
        const sourceMetadata = metadataMap.get(sourceIdentifier) || [];

        let nestedMappingPair: NestedMappingPair | undefined = undefined;

        const metadataAtMember = destinationMetadata.find((metadata) =>
            isPrimitiveArrayEqual(
                metadata[MetadataClassId.propertyKeys],
                memberPath
            )
        );

        let sourcePath = memberPath;

        if (namingConventions) {
            sourcePath = getFlatteningPaths(
                sourceObject,
                getPath(memberPath, namingConventions),
                namingConventions
            );
        }

        // sourcePath is not in sourceObject. No AutoMap available
        if (!(sourcePath[0] in sourceObject)) {
            mapping[MappingClassId.properties].push([
                memberPath,
                mappingProperty,
                nestedMappingPair,
            ]);
            return;
        }

        const metadataAtSource = sourceMetadata.find((metadata) =>
            isPrimitiveArrayEqual(
                metadata[MetadataClassId.propertyKeys],
                sourcePath
            )
        );

        if (metadataAtSource && metadataAtMember) {
            nestedMappingPair = [
                metadataAtMember[MetadataClassId.metaFn](),
                metadataAtSource[MetadataClassId.metaFn](),
            ];
        }

        mapping[MappingClassId.customProperties].push([
            memberPath,
            mappingProperty,
            nestedMappingPair,
        ]);
    };
}
