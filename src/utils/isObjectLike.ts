import { getTag } from './getTag';

export function isObjectLike(obj: any): boolean {
  return (
    getTag(obj) === '[object Object]' ||
    getTag(obj) === '[object Array]' ||
    getTag(obj) === '[object Date]'
  );
}
