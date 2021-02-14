import type { CreateMapOptions, Mapping } from '@automapper/types';
import { MappingClassId } from '@automapper/types';
import { isDefined } from '../utils';
import { extendMappings } from './extend-mappings.util';
import { getFlatteningSourcePaths } from './get-flattening-source-paths.util';
import { getNamingConventionsFromOptions } from './get-naming-conventions-from-options.util';
import { getNestedMetaKeyAtDestinationPath } from './get-nested-metakey-at-destination-path.util';
import { getPathRecursive } from './get-path-recursive.util';
import { getSourcePropertyPath } from './get-source-property-path.util';
import { mapInitialize } from './map-initialize';

function defaultIsMultipartSourcePathsInSource(
  multipartSourcePaths: string[],
  sourceObj: unknown
): boolean {
  return !(
    multipartSourcePaths.length > 1 &&
    (!sourceObj.hasOwnProperty(multipartSourcePaths[0]) ||
      (sourceObj[multipartSourcePaths[0]] &&
        typeof sourceObj[multipartSourcePaths[0]] === 'object'))
  );
}

function defaultIsDestinationPathOnSource(
  sourceObj: unknown,
  sourcePath: string
): boolean {
  return sourceObj.hasOwnProperty(sourcePath);
}

interface CreateInitialMappingOptions {
  isMultipartSourcePathsInSource?: (
    multipartSourcePaths: string[],
    sourceObj: unknown
  ) => boolean;
  isDestinationPathOnSource?: (
    sourceObj: unknown,
    sourcePath: string
  ) => boolean;
  prePropertiesLoop?: (mapping: Mapping) => void;
}

export function createInitialMapping(
  sourceObj: unknown,
  destinationObj: unknown,
  sourceNestedMetadataMap: unknown[],
  destinationNestedMetadataMap: unknown[],
  saveMapping: (mapping: Mapping) => void,
  options?: CreateMapOptions,
  createInitialMappingOptions?: CreateInitialMappingOptions
): Mapping {
  const {
    isMultipartSourcePathsInSource = defaultIsMultipartSourcePathsInSource,
    isDestinationPathOnSource = defaultIsDestinationPathOnSource,
    prePropertiesLoop,
  } = createInitialMappingOptions ?? {};
  const { extends: bases = [], namingConventions: conventions } = options ?? {};

  const mapping: Mapping = [
    [sourceObj, destinationObj],
    [],
    [],
    getNamingConventionsFromOptions(conventions),
    undefined,
  ];

  prePropertiesLoop?.(mapping);

  const destinationPaths = getPathRecursive(destinationObj) || [];
  const namingConventions = mapping[MappingClassId.namingConventions];
  let i = destinationPaths.length;
  while (i--) {
    const destinationPath = destinationPaths[i];
    const destinationNestedMetadataAtPath = getNestedMetaKeyAtDestinationPath(
      destinationNestedMetadataMap,
      sourceNestedMetadataMap,
      destinationPath,
      namingConventions
    );

    const sourcePath = getSourcePropertyPath(
      destinationPath,
      namingConventions
    );

    const dottedSourcePaths = sourcePath.split('.');
    if (!isMultipartSourcePathsInSource(dottedSourcePaths, sourceObj)) {
      continue;
    }

    // With namingConventions, flattening can happen
    if (
      !isDestinationPathOnSource(sourceObj, sourcePath) &&
      isDefined(namingConventions)
    ) {
      const sourcePaths = getFlatteningSourcePaths(
        sourceObj,
        sourcePath,
        namingConventions!
      );

      if (!isDefined(sourcePaths)) {
        continue;
      }

      mapping[MappingClassId.properties].push([
        destinationPath,
        [[destinationPath], [mapInitialize(...sourcePaths!)]],
        destinationNestedMetadataAtPath,
      ]);
      continue;
    }

    // Skip if there's no destinationPath on source
    if (!isDestinationPathOnSource(sourceObj, sourcePath)) {
      continue;
    }

    mapping[MappingClassId.properties].push([
      destinationPath,
      [[destinationPath, sourcePath], [mapInitialize(sourcePath)]],
      destinationNestedMetadataAtPath,
    ]);
  }

  // Inherit base mappings
  extendMappings(bases, mapping);

  saveMapping(mapping);

  return mapping;
}
