import { Collection, Utils } from '@mikro-orm/core';

export function isCollection(
  value: unknown
): value is Collection<Record<string, unknown>> {
  return Utils.isCollection(value);
}
