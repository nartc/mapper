import { mapInitialize } from '../member-functions/map-initialize';
import { Dict, Mapping, MappingClassId, TransformationType } from '../types';
import { getSourcePropertyKey, isClass, isObjectLike } from '../utils';
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
      const convention = new mapping[MappingClassId.conventions][0]();
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

function getPathRecursive(node: any, prefix: string = '', prev?: string[]) {
  let result: string[] = prev || [];

  if (!isObjectLike(node)) {
    return result;
  }

  const keys = Object.getOwnPropertyNames(node).filter(removeFromPath);
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    const path = prefix + key;
    if (!result.includes(path)) {
      result.push(path);
    }

    const child = node[key];
    if (isObjectLike(child)) {
      let queue = [child];
      if (Array.isArray(child)) {
        queue = child;
      }

      for (const childNode of queue) {
        const childPaths = getPathRecursive(childNode, path + '.');
        for (const childPath of childPaths) {
          if (result.includes(childPath)) {
            continue;
          }
          result.push(childPath);
        }
      }
    }
  }

  if (!prev) {
    result = getPathRecursive(getProto(node), prefix, result);
  }

  return result;
}

function removeFromPath(path: string): boolean {
  return (
    path !== 'constructor' &&
    path !== '__defineGetter__' &&
    path !== '__defineSetter__' &&
    path !== 'hasOwnProperty' &&
    path !== '__lookupGetter__' &&
    path !== '__lookupSetter__' &&
    path !== 'isPrototypeOf' &&
    path !== 'propertyIsEnumerable' &&
    path !== 'toString' &&
    path !== 'valueOf' &&
    path !== '__proto__' &&
    path !== 'toLocaleString'
  );
}
