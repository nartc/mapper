import { ObjectTag } from '../types';
import { getTag } from './getTag';

export function isDate(value: any): boolean {
  return getTag(value) === ObjectTag.Date;
}
