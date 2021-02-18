import * as tss from 'typescript/lib/tsserverlibrary';

export function hasFlag(type: tss.Type, flag: tss.TypeFlags): boolean {
  return (type.flags & flag) === flag;
}
