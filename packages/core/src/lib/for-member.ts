import { getMemberPath } from './get-member-path';
import type {
    Dictionary,
    Mapping,
    MappingConfigurationFn,
    MappingProperty,
    MemberMapReturn,
    PreConditionReturn,
    Selector,
} from './types';
import { MappingClassId } from './types';

export function forMember<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSelector extends Selector<TDestination>,
    TMemberType = TSelector extends Selector<TDestination, infer TMemberReturn>
        ? TMemberReturn
        : any
>(
    selector: TSelector,
    ...fns: [
        preCondOrMapMemberFn:
            | PreConditionReturn<TSource, TDestination, TMemberType>
            | MemberMapReturn<TSource, TDestination, TMemberType>
            | undefined,
        mapMemberFn?: MemberMapReturn<TSource, TDestination, TMemberType>
    ]
): MappingConfigurationFn<TSource, TDestination> {
    return () => {
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

        return (mapping: Mapping<TSource, TDestination>) => {
            mapping[MappingClassId.properties].push([
                memberPath,
                mappingProperty,
            ]);
        };
    };
}
