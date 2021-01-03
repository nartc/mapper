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

export const enum MappingPropertyClassId {
  paths,
  transformation,
}

export const enum MappingTransformationClassId {
  mapFn,
  preCond,
}

export const enum MapFnClassId {
  type,
  misc,
  fn,
}

export const enum MetadataClassId {
  propertyKey,
  metadataFn,
}
