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
  mapper,
  namingConventions,
  bases,
}

export const enum MappingPropertiesClassId {
  path,
  property,
  nestedMappingPair,
}

export const enum MappingPropertyClassId {
  targetAndOrigin,
  transformation,
}

export const enum MappingPropertyTargetOriginClassId {
  target,
  origin,
}

export const enum MappingTransformationClassId {
  memberMapFn,
  metadataNullFlag,
  preCond,
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
