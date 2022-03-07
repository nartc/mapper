/**
 * Solving Custom Constructor
 * - A function that returns the constructor (eg: () => new Model(), () => orm.create(Model, {...}))
 * - A withArgs() function (eg: withArgs((...args) => new Model(...args), ['the', 'arg']))
 */
// export function constructUsing(
//     model,
//     constructInstruction
// ): MappingConfigurationFn {
//     return (mapper) => {};
// }

import type {
    DestinationConstructor,
    Dictionary,
    Mapping,
    MappingConfigurationFn,
} from './types';
import { MappingClassId } from './types';

export const constructUsing = <
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    destinationConstructor: DestinationConstructor<TSource, TDestination>
): MappingConfigurationFn<TSource, TDestination> => {
    return () => (mapping: Mapping<TSource, TDestination>) => {
        mapping[MappingClassId.destinationConstructor] = destinationConstructor;
    };
};
