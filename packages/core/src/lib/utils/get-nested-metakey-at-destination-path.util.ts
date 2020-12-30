import type { NamingConvention } from '@automapper/types';
import { isDefined } from './is-defined.util';

export function getNestedMetaKeyAtDestinationPath(
  destinationNestedMeta: unknown[],
  sourceNestedMeta: unknown[],
  destinationPath: string,
  namingConventions: [NamingConvention, NamingConvention]
) {
  let destinationNestedMetaKeyAtPath: [unknown, unknown];

  if (destinationNestedMeta.length && sourceNestedMeta.length) {
    let sourceNestedMetaAtPath;
    const destinationNestedMetaAtPath = destinationNestedMeta.find(
      ([dnmPath]) => dnmPath === destinationPath
    )?.[1];

    if (isDefined(namingConventions)) {
      const [
        sourceNamingConvention,
        destinationNamingConvention,
      ] = namingConventions;
      sourceNestedMetaAtPath = sourceNestedMeta.find(
        ([snmPath]) =>
          destinationNamingConvention.transformPropertyName(
            snmPath
              .split(sourceNamingConvention.splittingExpression)
              .filter(Boolean)
          ) === destinationPath
      )?.[1];
    } else {
      sourceNestedMetaAtPath = sourceNestedMeta.find(
        ([snmPath]) => snmPath === destinationPath
      )?.[1];
    }

    if (sourceNestedMetaAtPath && destinationNestedMetaAtPath) {
      destinationNestedMetaKeyAtPath = [
        destinationNestedMetaAtPath,
        sourceNestedMetaAtPath,
      ];
    }
  }

  return destinationNestedMetaKeyAtPath;
}
