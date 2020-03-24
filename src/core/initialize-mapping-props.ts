import { mapInitialize } from '../member-functions/map-initialize';
import { Dict, Mapping, MappingClassId, TransformationType } from '../types';
import { getPathRecursive, getSourcePropertyKey, isClass } from '../utils';
import { getProto } from '../utils/getProto';
import { instantiate } from './instantiate';

export function initializeMappingProps<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(mapping: Mapping<TSource, TDestination>): void {
  const [srcModel, destModel] = mapping[MappingClassId.models];
  const destination = instantiate(destModel);

  let source = instantiate(srcModel);
  const sourceProtoConstructor = getProto(source.constructor);
  if (sourceProtoConstructor?.name) {
    source = Object.assign(source, instantiate(sourceProtoConstructor));
  }

  const sourceProto = getProto(source);
  const destinationPaths = getPathRecursive(destination);
  let i = destinationPaths.length;
  while (i--) {
    const path = destinationPaths[i];
    const sourcePath = getSourcePropertyKey(
      mapping[MappingClassId.conventions],
      path
    );
    const dottedSourcePaths = sourcePath.split('.');
    if (dottedSourcePaths.length > 1) {
      const [first] = dottedSourcePaths;
      if (
        !source.hasOwnProperty(first) ||
        ((source as any)[first] && isClass((source as any)[first]))
      ) {
        continue;
      }
    }

    if (
      !source.hasOwnProperty(sourcePath) &&
      !sourceProto.hasOwnProperty(sourcePath)
    ) {
      const [first, ...paths] = sourcePath
        .split(new mapping[MappingClassId.conventions][0]().splittingExpression)
        .filter(Boolean)
        .filter(p => p !== '.');
      if (!paths.length || !source.hasOwnProperty(first)) {
        continue;
      }

      const sourceMemberPath = [
        [first]
          .concat(
            paths.map(p =>
              new mapping[
                MappingClassId.conventions
              ][0]().transformPropertyName([p])
            )
          )
          .join('.'),
      ];

      if (paths.length > 1) {
        sourceMemberPath.push(
          [first]
            .concat(
              new mapping[
                MappingClassId.conventions
              ][0]().transformPropertyName(paths)
            )
            .join('.')
        );
      }

      mapping[MappingClassId.props].push([
        path,
        Object.seal({
          paths: [path],
          transformation: {
            type: TransformationType.MapInitialize,
            preCond: undefined,
            mapFn: mapInitialize(...sourceMemberPath),
          },
        }),
      ]);
      continue;
    }

    mapping[MappingClassId.props].push([
      path,
      Object.seal({
        paths: [path, sourcePath],
        transformation: {
          type: TransformationType.MapInitialize,
          preCond: undefined,
          mapFn: mapInitialize(sourcePath),
        },
      }),
    ]);
  }
}
