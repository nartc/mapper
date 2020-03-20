import {
  ConvertUsingFunction,
  FromValueFunction,
  MapWithFunction,
  MemberMapFunction,
  TransformationType,
} from '../types';

export function shouldHaveSource(
  mapFn: ReturnType<MemberMapFunction>
): mapFn is ReturnType<
  MapWithFunction | FromValueFunction | ConvertUsingFunction
> {
  return (
    mapFn.type === TransformationType.MapWith ||
    mapFn.type === TransformationType.FromValue ||
    mapFn.type === TransformationType.ConvertUsing
  );
}
