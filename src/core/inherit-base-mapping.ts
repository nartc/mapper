import {
  BaseOf,
  Dict,
  Mapping,
  MappingClassId,
  MappingProperty,
} from '../types';

export function inheritBaseMapping<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
>(
  mapping: Mapping<TSource, TDestination, TBaseSource, TBaseDestination>,
  baseMapping: Mapping<TBaseSource, TBaseDestination>
) {
  const props = mapping[MappingClassId.props];
  for (
    let i = 0, len = baseMapping[MappingClassId.props].length;
    i < len;
    i++
  ) {
    const [basePropKey, baseProp] = baseMapping[MappingClassId.props][i];
    if (props.map(p => p[0]).some(pKey => pKey === basePropKey)) {
      continue;
    }

    props.push([basePropKey, Object.seal({ ...baseProp }) as MappingProperty]);
  }
  mapping[MappingClassId.bases] = [
    baseMapping[MappingClassId.models][0],
    baseMapping[MappingClassId.models][1],
  ];
}
