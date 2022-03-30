import type {
    Converter,
    Dictionary,
    MappingConfiguration,
    MetadataIdentifier,
    PrimitiveConstructor,
    PrimitiveConstructorExtended,
    PrimitiveConstructorReturnType,
    Selector,
} from '../types';
import { MappingClassId } from '../types';
import { toSelector } from '../utils/to-selector';

type ConstructorReturnType<
    TConstructor extends
        | PrimitiveConstructorExtended
        | PrimitiveConstructorExtended[]
> = TConstructor extends PrimitiveConstructorExtended[]
    ? Array<PrimitiveConstructorReturnType<TConstructor[0]>>
    : TConstructor extends PrimitiveConstructorExtended
    ? PrimitiveConstructorReturnType<TConstructor>
    : never;

type ConverterOrValueSelector<
    TSourceConstructor extends
        | PrimitiveConstructorExtended
        | PrimitiveConstructorExtended[],
    TDestinationConstructor extends
        | PrimitiveConstructorExtended
        | PrimitiveConstructorExtended[]
> =
    | Selector<
          ConstructorReturnType<TSourceConstructor>,
          ConstructorReturnType<TDestinationConstructor> | undefined
      >
    | Converter<
          ConstructorReturnType<TSourceConstructor>,
          ConstructorReturnType<TDestinationConstructor> | undefined
      >;

export function typeConverter<
    TSource extends Dictionary<TSource>,
    TDestination extends Dictionary<TDestination>,
    TSourceConstructor extends
        | PrimitiveConstructorExtended
        | [PrimitiveConstructorExtended],
    TDestinationConstructor extends
        | PrimitiveConstructorExtended
        | [PrimitiveConstructorExtended]
>(
    source: TSourceConstructor,
    destination: TDestinationConstructor,
    converterOrValueSelector: ConverterOrValueSelector<
        TSourceConstructor,
        TDestinationConstructor
    >
): MappingConfiguration<TSource, TDestination> {
    return (mapping) => {
        const isSourceArray = Array.isArray(source);
        const isDestinationArray = Array.isArray(destination);
        const sourceIdentifier: PrimitiveConstructorExtended = isSourceArray
            ? source[0]
            : source;
        const destinationIdentifier: PrimitiveConstructorExtended =
            isDestinationArray ? destination[0] : destination;

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
                ? arraySourceTypeConverters
                : sourceTypeConverters;
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
