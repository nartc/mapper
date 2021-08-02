import type {
  Converter,
  Mapping,
  PrimitiveConstructorWithDate,
  ValueSelector,
} from '@automapper/types';
import { MapFnClassId, MappingPropertiesClassId } from '@automapper/types';

export function applyTypeConverters(
  mapping: Mapping,
  typeConverters: WeakMap<
    PrimitiveConstructorWithDate,
    WeakMap<PrimitiveConstructorWithDate, ValueSelector | Converter>
  >
): void {
  const [, initializedProps] = mapping;
  for (
    let i = 0, initializedPropsLen = initializedProps.length;
    i < initializedPropsLen;
    i++
  ) {
    const initializeProp = initializedProps[i];
    const [destinationType, sourceType] =
      initializeProp[MappingPropertiesClassId.nestedMappingPair];
    const typeConverter = typeConverters
      .get(sourceType as PrimitiveConstructorWithDate)
      ?.get(destinationType as PrimitiveConstructorWithDate);
    if (typeConverter) {
      const originalMapInitializeFn =
        initializeProp[MappingPropertiesClassId.property][1][0][
          MapFnClassId.fn
        ];

      initializeProp[MappingPropertiesClassId.property][1][0][MapFnClassId.fn] =
        (source: unknown) => {
          if ('convert' in typeConverter) {
            return typeConverter.convert(
              (originalMapInitializeFn as ValueSelector)(source)
            );
          }
          return typeConverter(
            (originalMapInitializeFn as ValueSelector)(source)
          );
        };
    }
  }
}
