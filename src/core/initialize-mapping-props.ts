import { mapInitialize } from '../member-functions/map-initialize';
import { Dict, Mapping, MappingClassId } from '../types';
import { getSourcePropertyKey, isClass, isObjectLike } from '../utils';
import { instantiate } from './instantiate';

export function initializeMappingProps<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any
>(mapping: Mapping<TSource, TDestination>): void {
  const [srcModel, destModel] = mapping[MappingClassId.models];
  const destination = instantiate(destModel);
  let source = instantiate(srcModel);
  const sourceProtoConstructor = Object.getPrototypeOf(source.constructor);
  if (sourceProtoConstructor.name) {
    source = Object.assign(source, instantiate(sourceProtoConstructor));
  }

  const sourceProto = Object.getPrototypeOf(source);
  const destinationPaths = getPathRecursive(destination);
  const [
    useUndefined,
    sourceNamingConvention,
    destinationNamingConvention,
  ] = mapping[MappingClassId.conventions];
  let i = destinationPaths.length;
  while (i--) {
    const path = destinationPaths[i];
    const sourcePath = getSourcePropertyKey(
      [sourceNamingConvention, destinationNamingConvention],
      path
    );
    const dottedSourcePaths = sourcePath.split('.');
    if (
      dottedSourcePaths.length > 1 &&
      (!source.hasOwnProperty(dottedSourcePaths[0]) ||
        ((source as any)[dottedSourcePaths[0]] &&
          isClass((source as any)[dottedSourcePaths[0]])))
    ) {
      continue;
    }

    const defaultVal = useUndefined ? undefined : null;
    if (
      !source.hasOwnProperty(sourcePath) &&
      !sourceProto.hasOwnProperty(sourcePath)
    ) {
      const convention = new sourceNamingConvention();
      const [first, ...paths] = sourcePath
        .split(convention.splittingExpression)
        .filter(Boolean)
        .filter(p => p !== '.');
      if (!paths.length || !source.hasOwnProperty(first)) {
        continue;
      }

      const sourceMemberPath = [
        [first]
          .concat(paths.map(p => convention.transformPropertyName([p])))
          .join('.'),
      ];

      if (paths.length > 1) {
        sourceMemberPath.push(
          [first].concat(convention.transformPropertyName(paths)).join('.')
        );
      }

      mapping[MappingClassId.props].push([
        path,
        Object.seal({
          paths: [path],
          transformation: {
            type: 6, // 6: TransformationType.MapInitialize.
            preCond: undefined,
            mapFn: mapInitialize(defaultVal, ...sourceMemberPath),
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
          type: 6, // 6: TransformationType.MapInitialize.
          preCond: undefined,
          mapFn: mapInitialize(defaultVal, sourcePath),
        },
      }),
    ]);
  }
}

function getPathRecursive(node: any, prefix: string = '', prev?: string[]) {
  let result: string[] = prev || [];

  const keys = Object.getOwnPropertyNames(node);
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    const path = prefix + key;
    result.push(path);

    const child = node[key];
    if (isObjectLike(child)) {
      let queue = [child];
      if (Array.isArray(child)) {
        queue = child;
      }

      for (const childNode of queue) {
        const childPaths = getPathRecursive(childNode, path + '.');
        for (const childPath of childPaths) {
          result.push(childPath);
        }
      }
    }
  }

  return result;
}
