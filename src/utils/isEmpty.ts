import { getTag } from './getTag';

export function isEmpty(value: any): boolean {
  const tag = getTag(value);
  if (tag === '[object Map]') {
    return !value.size;
  }

  if (tag === '[object Object]') {
    return !Object.keys(value).length;
  }

  if (tag === '[object Array]') {
    return !value.length;
  }

  return !value;
}
