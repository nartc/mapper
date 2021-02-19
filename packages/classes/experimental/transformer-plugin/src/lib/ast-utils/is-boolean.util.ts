import * as tss from 'typescript/lib/tsserverlibrary';
import { hasFlag } from './has-flag.util';

export function isBoolean(type: tss.Type): boolean {
  return (
    hasFlag(type, tss.TypeFlags.Boolean) ||
    (type.isUnionOrIntersection() &&
      type.types[0].flags === tss.TypeFlags.BooleanLiteral)
  );
}
