import { Reference } from '@mikro-orm/core';

export function isReference(value: unknown): value is Reference<any> {
  return Reference.isReference(value);
}
