import { createMappingUtil } from '../mappings/create-initial-mapping';
import { createMap } from '../mappings/create-map';
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
        const [sourceIdentifier, destinationIdentifier] =
            mapping[MappingClassId.identifiers];
        const mapper = mapping[MappingClassId.mapper];
        const namingConventions = mapping[MappingClassId.namingConventions];
        const [sourceObject] = mapping[MappingClassId.identifierMetadata];

        const { getNestedMappingPair, getMetadataAtMember, processSourcePath } =
            createMappingUtil(mapper, sourceIdentifier, destinationIdentifier);

        const sourcePath = processSourcePath(
            sourceObject,
            namingConventions,
            memberPath
        );

        // sourcePath is not in sourceObject. No AutoMap available
        if (!(sourcePath[0] in sourceObject)) {
            mapping[MappingClassId.customProperties].push([
                memberPath,
                mappingProperty,
                undefined,
            ]);
            return;
        }

        const metadataAtMember = getMetadataAtMember(memberPath, 'destination');
        const metadataAtSource = getMetadataAtMember(sourcePath, 'source');
        const nestedMappingPair = getNestedMappingPair(
            metadataAtSource,
            metadataAtMember
        );

        mapping[MappingClassId.customProperties].push([
            memberPath,
            mappingProperty,
            nestedMappingPair,
        ]);
    };
}
