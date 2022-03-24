import type {
    Dictionary,
    Mapping,
    MappingConfiguration,
    NamingConventionInput,
} from '../types';
import { MappingClassId } from '../types';
import { normalizeNamingConventions } from '../utils/normalize-naming-conventions';

export const namingConventions = <
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    namingConventions: NamingConventionInput
): MappingConfiguration<TSource, TDestination> => {
    return (mapping: Mapping<TSource, TDestination>) => {
        mapping[MappingClassId.namingConventions] =
            normalizeNamingConventions(namingConventions);
    };
};
