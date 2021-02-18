import * as tss from 'typescript/lib/tsserverlibrary';
import { hasFlag } from './has-flag.util';

export function isNumber(type: tss.Type) {
  return hasFlag(type, tss.TypeFlags.Number);
}
