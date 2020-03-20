import {
  MapInitializeFunction,
  MemberMapFunction,
  TransformationType,
} from '../types';

export function isMapInitialize(
  mapFn: ReturnType<MemberMapFunction>
): mapFn is ReturnType<MapInitializeFunction> {
  return mapFn.type === TransformationType.MapInitialize;
}
