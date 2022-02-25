import { AnyEntity, IWrappedEntity, Utils } from '@mikro-orm/core';

export function isEntity(entity: unknown): entity is IWrappedEntity<AnyEntity> {
  return Utils.isEntity(entity);
}
