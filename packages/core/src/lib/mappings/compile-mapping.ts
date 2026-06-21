import type {
    CompiledMapping,
    CompiledMappingProperty,
    Dictionary,
    Mapping,
} from '../types';
import { MapFnClassId, MappingClassId } from '../types';

// Destructure a mapping's positional `properties` tuples once into a flat
// descriptor list (plus the invariant set of configured destination keys).
// Called eagerly at createMap time; the result is stored on the mapping at
// MappingClassId.compiledPlan and read directly by the map() hot loop, so no
// per-call re-destructuring (and no WeakMap probe) happens.
export function compileMapping<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    propsToMap: Mapping<TSource, TDestination>[MappingClassId.properties]
): CompiledMapping<TSource, TDestination> {
    const props: CompiledMappingProperty<TSource, TDestination>[] = [];
    const configuredKeys: string[] = [];

    for (let i = 0, length = propsToMap.length; i < length; i++) {
        const [
            destinationMemberPath,
            [
                ,
                [
                    transformationMapFn,
                    [
                        transformationPreConditionPredicate,
                        transformationPreConditionDefaultValue = undefined,
                    ] = [],
                ],
            ],
            [destinationMemberIdentifier, sourceMemberIdentifier] = [],
        ] = propsToMap[i];

        props.push({
            destinationMemberPath,
            transformationMapFn,
            transformationType: transformationMapFn[MapFnClassId.type],
            transformationPreConditionPredicate,
            transformationPreConditionDefaultValue,
            destinationMemberIdentifier,
            sourceMemberIdentifier,
        });
        configuredKeys.push(destinationMemberPath[0]);
    }

    return { props, configuredKeys };
}
