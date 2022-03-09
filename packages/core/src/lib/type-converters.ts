import { TYPE_CONVERTERS } from './symbols';
import { toSelector } from './to-selector';
import type {
    Converter,
    Dictionary,
    Mapper,
    MappingConfiguration,
    MetadataIdentifier,
    PrimitiveConstructor,
    PrimitiveConstructorExtended,
    PrimitiveConstructorReturnType,
    Selector,
} from './types';
import { MappingClassId } from './types';

export function getTypeConverters(mapper: Mapper) {
    return mapper[TYPE_CONVERTERS];
}

export function typeConverter<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSourceConstructor extends PrimitiveConstructorExtended = PrimitiveConstructorExtended,
    TDestinationConstructor extends PrimitiveConstructorExtended = PrimitiveConstructorExtended
>(
    source: TSourceConstructor,
    destination: TDestinationConstructor,
    converterOrValueSelector:
        | Selector<
              PrimitiveConstructorReturnType<TSourceConstructor>,
              | PrimitiveConstructorReturnType<TDestinationConstructor>
              | undefined
          >
        | Converter<
              PrimitiveConstructorReturnType<TSourceConstructor>,
              | PrimitiveConstructorReturnType<TDestinationConstructor>
              | undefined
          >
): MappingConfiguration<TSource, TDestination> {
    return (mapping) => {
        const selector = toSelector(converterOrValueSelector);
        const typeConverters =
            mapping[MappingClassId.typeConverters] ||
            new Map<
                MetadataIdentifier | PrimitiveConstructor | DateConstructor,
                Map<
                    MetadataIdentifier | PrimitiveConstructor | DateConstructor,
                    Selector
                >
            >();

        const sourceTypeConverters = typeConverters.get(source);
        if (sourceTypeConverters) {
            sourceTypeConverters.set(destination, selector);
            return;
        }

        typeConverters.set(
            source,
            new Map<
                MetadataIdentifier | PrimitiveConstructor | DateConstructor,
                Selector
            >([[destination, selector]])
        );
    };
}
