/**
 * Internal InstantiateDepthStorage class
 * @private
 */
import { Constructible } from '../types';
import { MapNestedStorage } from './base-storage';

class InstantiateDepthStorage extends MapNestedStorage<Constructible, number> {
  private recursiveCounts: WeakMap<Constructible, Map<string, number>>;

  constructor() {
    super();
    this.recursiveCounts = new WeakMap<Constructible, Map<string, number>>();
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

export const instantiateDepthStorage = new InstantiateDepthStorage();
