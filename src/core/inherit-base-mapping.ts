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
  const baseProps = baseMapping[MappingClassId.props];
  for (let i = 0, len = baseProps.length; i < len; i++) {
    const [basePropKey, baseProp] = baseProps[i];
    const propFromBase = Object.seal({ ...baseProp }) as MappingProperty;
    const existProp = props.find(([pKey]) => pKey === basePropKey);
    if (existProp) {
      existProp[0] = basePropKey;
      existProp[1] = propFromBase;
    } else {
      props.push([basePropKey, propFromBase]);
    }
  }
  mapping[MappingClassId.bases] = [
    baseMapping[MappingClassId.models][0],
    baseMapping[MappingClassId.models][1],
  ];
}
