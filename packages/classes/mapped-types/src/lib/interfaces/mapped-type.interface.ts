import type { Constructible } from '@automapper/classes';

export interface MappedType<T> extends Constructible<T> {
  new (): T;
}
