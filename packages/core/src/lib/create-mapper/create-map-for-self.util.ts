import {
  Mapping,
  MappingClassId,
  MappingPropertiesClassId,
  Selector,
  TransformationType,
} from '@automapper/types';
import { get } from '@automapper/core';

export function createMapForSelf<TSource, TDestination>(
  mapping: Mapping<TSource, TDestination>,
  source: unknown,
  selector: Selector<TSource>
) {
  const mapper = mapping[MappingClassId.mapper];

  const [sourceInstance] = mapper.plugin.instantiate(source);
  const sourceInstanceKeys = Object.keys(sourceInstance);

  for (let i = 0, keysLen = sourceInstanceKeys.length; i < keysLen; i++) {
    const key = sourceInstanceKeys[i];
    const foundMapInitialized = mapping[MappingClassId.properties].find(
      ([[path]]) => path === key
    );

    if (!foundMapInitialized) {
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
    } else {
      foundMapInitialized[MappingPropertiesClassId.property][1][0] = [
        TransformationType.MapInitialize,
        (originalSource) => get(selector(originalSource), [key]),
      ];
    }
  }
}
