import { Constructible, Mapping } from '../types';
import { WeakMapNestedStorage } from './base-storage';

/**
 * Internal MappingStorage class
 * @private
 */
export class MappingStorage extends WeakMapNestedStorage<
  Constructible,
  Mapping
> {
  constructor() {
    super();
  }
}
