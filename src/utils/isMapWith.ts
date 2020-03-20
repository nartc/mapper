import {
  MapWithFunction,
  MemberMapFunction,
  TransformationType,
} from '../types';

export function isMapWith(
  mapFn: ReturnType<MemberMapFunction>
): mapFn is ReturnType<MapWithFunction> {
  return mapFn.type === TransformationType.MapWith;
}
