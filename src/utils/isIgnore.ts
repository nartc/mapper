import {
  IgnoreFunction,
  MemberMapFunction,
  TransformationType,
} from '../types';

export function isIgnore(
  mapFn: ReturnType<MemberMapFunction>
): mapFn is ReturnType<IgnoreFunction> {
  return mapFn.type === TransformationType.Ignore;
}
