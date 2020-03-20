import { ObjectTag } from '../types';
import { getTag } from './getTag';

export function isObjectLike(obj: any): boolean {
  return (
    getTag(obj) === ObjectTag.Object ||
    getTag(obj) === ObjectTag.Array ||
    getTag(obj) === ObjectTag.Date
  );
}
