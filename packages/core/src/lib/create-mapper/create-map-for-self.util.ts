import type { Mapping, Selector } from '../types';
import {
  MapFnClassId,
  MappingClassId,
  MappingPropertiesClassId,
  MappingPropertyClassId,
  MappingTransformationClassId,
  TransformationType,
} from '../types';
import { get } from '../utils';

/**
 *
 * @param {Mapping} mapping - Mapping between source <> destination
 * @param {TSource} source - the Source model to map to self
 * @param {Selector<TSource>} selector - the selector to use to get the property that contains the source
 */
export function createMapForSelf<TSource, TDestination>(
  mapping: Mapping<TSource, TDestination>,
  source: unknown,
  selector: Selector<TSource>
) {
  const mapper = mapping[MappingClassId.mapper];
  const [, destinationInstance] = mapping[MappingClassId.mappings];

  const [sourceInstance] = mapper.plugin.instantiate(source);
  const sourceInstanceKeys = Object.keys(sourceInstance);

  for (let i = 0, keysLen = sourceInstanceKeys.length; i < keysLen; i++) {
    const key = sourceInstanceKeys[i];
    const foundMapProperty = mapping[MappingClassId.properties].find(
      (property) => property[MappingPropertiesClassId.path].indexOf(key) === 0
    );

    if (!foundMapProperty) {
      if (!(key in destinationInstance)) continue;
      mapping[MappingClassId.properties].push([
        [key],
        [
          [[key]],
          [
            [
              TransformationType.MapInitialize,
              (originalSource) => get(selector(originalSource), [key]),
            ],
            false,
          ],
        ],
      ]);
      continue;
    }

    if (
      foundMapProperty[MappingPropertiesClassId.property][
        MappingPropertyClassId.transformation
      ][MappingTransformationClassId.memberMapFn][MapFnClassId.type] !==
      TransformationType.MapInitialize
    )
      continue;
    foundMapProperty[MappingPropertiesClassId.property][
      MappingPropertyClassId.transformation
    ][MappingTransformationClassId.memberMapFn] = [
      TransformationType.MapInitialize,
      (originalSource) => get(selector(originalSource), [key]),
    ];
  }
}
