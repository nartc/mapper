import {
  MapFromFunction,
  MemberMapFunction,
  TransformationType,
} from '../types';

export function isMapFrom(
  mapFn: ReturnType<MemberMapFunction>
): mapFn is ReturnType<MapFromFunction> {
  return mapFn.type === TransformationType.MapFrom;
}
