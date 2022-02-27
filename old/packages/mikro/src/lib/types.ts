import type { AnyEntity } from '@mikro-orm/core';

export interface MikroInitializerOptions {
  serializeEntity: (entity: AnyEntity) => any;
}
