import { getTag } from './getTag';

export function isObjectLike(obj: any): boolean {
  const tag = getTag(obj);
  return (
    tag === '[object Object]' ||
    tag === '[object Array]' ||
    tag === '[object Date]'
  );
}
