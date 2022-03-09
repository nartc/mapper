import { getMemberPath } from './get-member-path';
import type {
    Dictionary,
    MappingConfiguration,
    MappingProperty,
    MemberMapReturn,
    PreConditionReturn,
    Selector,
    SelectorReturn,
} from './types';
import { MappingClassId } from './types';

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
        mapping[MappingClassId.properties].push([memberPath, mappingProperty]);
    };
}
