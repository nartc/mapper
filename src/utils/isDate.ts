import { getTag } from './getTag';

export function isDate(value: any): boolean {
  return getTag(value) === '[object Date]';
}
