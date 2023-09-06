import type { Constructor } from '@jersmart/automapper-core';

export interface MappedType<T> extends Constructor<T> {
    new (): T;
}
