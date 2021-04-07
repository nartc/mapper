export const enum TransformationType {
  Ignore,
  MapFrom,
  Condition,
  FromValue,
  MapWith,
  ConvertUsing,
  MapInitialize,
  NullSubstitution,
  MapDefer,
  MapWithArguments,
}

export const enum MappingClassId {
  mappings,
  properties,
  actions,
  namingConventions,
  bases,
}

export const enum MappingPropertiesClassId {
  path,
  property,
  nestedMappingPair,
}

export const enum MapFnClassId {
  type,
  fn,
  misc,
}

export const enum MetadataClassId {
  propertyKey,
  metadataFn,
  isGetterOnly,
}
