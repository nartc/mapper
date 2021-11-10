import type { NamingConvention } from '../types';
import { isDefined, isEmpty, isSamePath } from '../utils';

export function getNestedMetaKeyAtDestinationPath(
  destinationNestedMeta: unknown[],
  sourceNestedMeta: unknown[],
  destinationPath: string[],
  namingConventions: [NamingConvention, NamingConvention] | undefined
) {
  let destinationNestedMetaKeyAtPath: [unknown, unknown];

  if (!isEmpty(sourceNestedMeta) && !isEmpty(destinationNestedMeta)) {
    let sourceNestedMetaAtPath;
    const destinationNestedMetaAtPath = destinationNestedMeta.find(
      ([destinationNestedMetaPath]: [string[]]) =>
        isSamePath(destinationNestedMetaPath, destinationPath)
    )?.[1];

    if (isDefined(namingConventions)) {
      const [sourceNamingConvention, destinationNamingConvention] =
        namingConventions!;
      sourceNestedMetaAtPath = sourceNestedMeta.find(
        ([sourceNestedMetaPath]: [string[]]) =>
          isSamePath(
            sourceNestedMetaPath.map((s) =>
              destinationNamingConvention.transformPropertyName(
                s
                  .split(sourceNamingConvention.splittingExpression)
                  .filter(Boolean)
              )
            ),
            destinationPath
          )
      )?.[1];
    } else {
      sourceNestedMetaAtPath = sourceNestedMeta.find(
        ([sourceNestedMetaPath]: [string[]]) =>
          isSamePath(sourceNestedMetaPath, destinationPath)
      )?.[1];
    }

    if (sourceNestedMetaAtPath && destinationNestedMetaAtPath) {
      destinationNestedMetaKeyAtPath = [
        destinationNestedMetaAtPath,
        sourceNestedMetaAtPath,
      ];
    }
  }

  return destinationNestedMetaKeyAtPath! != null
    ? destinationNestedMetaKeyAtPath
    : undefined;
}
