import type {
  Converter,
  Mapping,
  PrimitiveConstructorWithDate,
  ValueSelector,
} from '@automapper/types';
import {
  MapFnClassId,
  MappingPropertiesClassId,
  MappingPropertyClassId,
  MappingTransformationClassId,
} from '@automapper/types';

/**
 *
 * Apply converters if available to mapInitialize on createMap
 *
 * @param mapping
 * @param typeConverters
 */
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
    if (
      initializeProp == null ||
      initializeProp[MappingPropertiesClassId.nestedMappingPair] == null
    )
      continue;
    const [destinationType, sourceType] =
      initializeProp[MappingPropertiesClassId.nestedMappingPair];
    const typeConverter = typeConverters
      .get(sourceType as PrimitiveConstructorWithDate)
      ?.get(destinationType as PrimitiveConstructorWithDate);
    if (typeConverter) {
      const originalMapInitializeFn =
        initializeProp[MappingPropertiesClassId.property][
          MappingPropertyClassId.transformation
        ][MappingTransformationClassId.memberMapFn][MapFnClassId.fn];

      initializeProp[MappingPropertiesClassId.property][
        MappingPropertyClassId.transformation
      ][MappingTransformationClassId.memberMapFn][MapFnClassId.fn] = (
        source
      ) => {
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
