import { BaseOf, Dict, Mapping, MappingProperty } from '../types';

export function inheritBaseMapping<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
>(
  mapping: Mapping<TSource, TDestination, TBaseSource, TBaseDestination>,
  baseMapping: Mapping<TBaseSource, TBaseDestination>
) {
  const props = mapping.props;
  for (let i = 0, len = baseMapping.props.length; i < len; i++) {
    const [basePropKey, baseProp] = baseMapping.props[i];
    if (props.map(p => p[0]).some(pKey => pKey === basePropKey)) {
      continue;
    }

    props.push([basePropKey, Object.seal({ ...baseProp }) as MappingProperty]);
  }
  mapping.bases = [baseMapping.models[0], baseMapping.models[1]];
}
