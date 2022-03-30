import type {
    DestinationConstructor,
    Dictionary,
    Mapping,
    MappingConfiguration,
} from '../types';
import { MappingClassId } from '../types';

export const constructUsing = <
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    destinationConstructor: DestinationConstructor<TSource, TDestination>
): MappingConfiguration<TSource, TDestination> => {
    return (mapping: Mapping<TSource, TDestination>) => {
        mapping[MappingClassId.destinationConstructor] = destinationConstructor;
    };
};
