import {
  MemberMapFunction,
  MemberMapFunctionReturnClassId,
  TransformationType,
} from '../types';

export function isThisMemberMap<TMemberMap extends MemberMapFunction>(
  mapFn: ReturnType<MemberMapFunction>,
  type: TransformationType
): mapFn is ReturnType<TMemberMap> {
  return mapFn[MemberMapFunctionReturnClassId.type] === type;
}
