import * as tss from 'typescript/lib/tsserverlibrary';
import { hasFlag } from './has-flag.util';

export function isString(type: tss.Type): boolean {
  return hasFlag(type, tss.TypeFlags.String);
}
