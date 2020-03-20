import {
  ConditionFunction,
  MemberMapFunction,
  NullSubstitutionFunction,
  TransformationType,
} from '../types';

export function shouldHaveMemberPath(
  mapFn: ReturnType<MemberMapFunction>
): mapFn is ReturnType<ConditionFunction | NullSubstitutionFunction> {
  return (
    mapFn.type === TransformationType.Condition ||
    mapFn.type === TransformationType.NullSubstitution
  );
}
