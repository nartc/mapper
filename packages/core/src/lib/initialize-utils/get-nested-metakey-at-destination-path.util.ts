import type { NamingConvention } from '@automapper/types';
import { isDefined, isEmpty, isSamePath } from '../utils';

export function getNestedMetaKeyAtDestinationPath(
  destinationNestedMeta: any[],
  sourceNestedMeta: any[],
  destinationPath: string[],
  namingConventions: [NamingConvention, NamingConvention] | undefined
) {
  let destinationNestedMetaKeyAtPath: [unknown, unknown];

  if (!isEmpty(sourceNestedMeta) && !isEmpty(destinationNestedMeta)) {
    let sourceNestedMetaAtPath;
    const destinationNestedMetaAtPath = destinationNestedMeta.find(
      ([dnmPath]: [string[]]) => isSamePath(dnmPath, destinationPath)
    )?.[1];

    if (isDefined(namingConventions)) {
      const [
        sourceNamingConvention,
        destinationNamingConvention,
      ] = namingConventions!;
      sourceNestedMetaAtPath = sourceNestedMeta.find(
        ([snmPath]: [string[]]) =>
          isSamePath(snmPath.map(s =>
            destinationNamingConvention.transformPropertyName(
              s.split(sourceNamingConvention.splittingExpression).filter(Boolean))
          ), destinationPath)
      )?.[1];
    } else {
      sourceNestedMetaAtPath = sourceNestedMeta.find(
        ([snmPath]: [string[]]) => isSamePath(snmPath, destinationPath)
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
