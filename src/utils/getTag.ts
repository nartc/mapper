import { ObjectTag } from '../types';

export function getTag(value: any): string {
  if (value == null) {
    return value === undefined ? ObjectTag.Undefined : ObjectTag.Null;
  }

  return Object.prototype.toString.call(value) as ObjectTag;
}
