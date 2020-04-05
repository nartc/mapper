import { ObjectTag } from '../types';
import { getTag } from './getTag';

export function isEmpty(value: any): boolean {
  const tag = getTag(value);
  if (tag === ObjectTag.Map) {
    return !value.size;
  }

  if (tag === ObjectTag.Object) {
    return !Object.keys(value).length;
  }

  if (tag === ObjectTag.Array) {
    return !value.length;
  }

  return !value;
}
