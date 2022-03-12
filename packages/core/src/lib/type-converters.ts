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
    TSourceConstructor extends PrimitiveConstructorExtended,
    TDestinationConstructor extends PrimitiveConstructorExtended
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
): MappingConfiguration<TSource, TDestination>;
export function typeConverter<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSourceConstructor extends [PrimitiveConstructorExtended],
    TDestinationConstructor extends [PrimitiveConstructorExtended]
>(
    source: TSourceConstructor,
    destination: TDestinationConstructor,
    converterOrValueSelector:
        | Selector<
              Array<PrimitiveConstructorReturnType<TSourceConstructor[0]>>,
              | Array<
                    PrimitiveConstructorReturnType<TDestinationConstructor[0]>
                >
              | undefined
          >
        | Converter<
              Array<PrimitiveConstructorReturnType<TSourceConstructor[0]>>,
              | Array<
                    PrimitiveConstructorReturnType<TDestinationConstructor[0]>
                >
              | undefined
          >
): MappingConfiguration<TSource, TDestination>;
export function typeConverter<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSourceConstructor extends [PrimitiveConstructorExtended],
    TDestinationConstructor extends PrimitiveConstructorExtended
>(
    source: TSourceConstructor,
    destination: TDestinationConstructor,
    converterOrValueSelector:
        | Selector<
              Array<PrimitiveConstructorReturnType<TSourceConstructor[0]>>,
              | PrimitiveConstructorReturnType<TDestinationConstructor>
              | undefined
          >
        | Converter<
              Array<PrimitiveConstructorReturnType<TSourceConstructor[0]>>,
              | PrimitiveConstructorReturnType<TDestinationConstructor>
              | undefined
          >
): MappingConfiguration<TSource, TDestination>;
export function typeConverter<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSourceConstructor extends PrimitiveConstructorExtended,
    TDestinationConstructor extends [PrimitiveConstructorExtended]
>(
    source: TSourceConstructor,
    destination: TDestinationConstructor,
    converterOrValueSelector:
        | Selector<
              PrimitiveConstructorReturnType<TSourceConstructor>,
              | Array<
                    PrimitiveConstructorReturnType<TDestinationConstructor[0]>
                >
              | undefined
          >
        | Converter<
              PrimitiveConstructorReturnType<TSourceConstructor>,
              | Array<
                    PrimitiveConstructorReturnType<TDestinationConstructor[0]>
                >
              | undefined
          >
): MappingConfiguration<TSource, TDestination>;
export function typeConverter<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>
>(
    source: PrimitiveConstructorExtended | [PrimitiveConstructorExtended],
    destination: PrimitiveConstructorExtended | [PrimitiveConstructorExtended],
    converterOrValueSelector: Selector | Converter
): MappingConfiguration<TSource, TDestination> {
    return (mapping) => {
        const isSourceArray = Array.isArray(source);
        const isDestinationArray = Array.isArray(destination);
        const sourceIdentifier = isSourceArray ? source[0] : source;
        const destinationIdentifier = isDestinationArray
            ? destination[0]
            : destination;

        const selector = toSelector(converterOrValueSelector);
        const typeConverters =
            mapping[MappingClassId.typeConverters] ||
            (mapping[MappingClassId.typeConverters] = new Map());

        let sourceConverters: Map<
            MetadataIdentifier | PrimitiveConstructor | DateConstructor,
            [Selector?, Selector?]
        >;

        const [sourceTypeConverters, arraySourceTypeConverters] =
            typeConverters.get(sourceIdentifier) || [];

        if (sourceTypeConverters || arraySourceTypeConverters) {
            sourceConverters = isSourceArray
                ? arraySourceTypeConverters!
                : sourceTypeConverters!;
            const [destinationConverter, arrayDestinationConverter] =
                sourceConverters.get(destinationIdentifier) || [];
            sourceConverters.set(
                destinationIdentifier,
                isDestinationArray
                    ? [destinationConverter, selector]
                    : [selector, arrayDestinationConverter]
            );
            return;
        }

        sourceConverters = new Map([
            [
                destinationIdentifier,
                isDestinationArray
                    ? [undefined, selector]
                    : [selector, undefined],
            ],
        ]);

        typeConverters.set(
            sourceIdentifier,
            isSourceArray
                ? [new Map(), sourceConverters]
                : [sourceConverters, new Map()]
        );
    };
}
