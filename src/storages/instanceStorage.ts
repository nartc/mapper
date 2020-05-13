/**
 * Internal InstanceStorage class
 * @private
 */
import { Constructible } from '../types';
import { MapNestedStorage } from './base-storage';

class InstanceStorage extends MapNestedStorage<Constructible, number> {
  private recursiveCounts: WeakMap<Constructible, Map<string, number>>;

  constructor() {
    super();
    this.recursiveCounts = new WeakMap<Constructible, Map<string, number>>();
  }

  getDepthAndCount(
    parent: Constructible,
    member: string
  ): [number | undefined, number | undefined] {
    return [this.get(parent, member), this.getCount(parent, member)];
  }

  setCount(parent: Constructible, member: string, count: number) {
    if (this.recursiveCounts.has(parent)) {
      this.recursiveCounts.get(parent)?.set(member, count);
    } else {
      this.setInternal(this.recursiveCounts, parent, member, count);
    }
  }

  getCount(parent: Constructible, member: string): number | undefined {
    return this.getInternal(this.recursiveCounts, parent, member);
  }

  resetCount(parent: Constructible, member: string) {
    this.recursiveCounts.get(parent)?.set(member, 0);
  }

  dispose() {
    this.recursiveCounts = new WeakMap<Constructible, Map<string, number>>();
  }
}

export const instanceStorage = new InstanceStorage();
