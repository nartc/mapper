import type { Constructor } from '@automapper/core';

export interface MappedType<T> extends Constructor<T> {
    new (): T;
}
