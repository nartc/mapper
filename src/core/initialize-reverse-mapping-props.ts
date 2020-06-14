import { mapInitialize } from '../member-functions/map-initialize';
import {
  BaseOf,
  Dict,
  MapFromFunction,
  Mapping,
  MappingClassId,
  MappingProperty,
  MapWithFunction,
  Selector,
} from '../types';
import { getMemberPath, isThisMemberMap } from '../utils';
import { instantiate } from './instantiate';

export function initializeReverseMappingProps<
  TSource extends Dict<TSource> = any,
  TDestination extends Dict<TDestination> = any,
  TBaseSource extends BaseOf<TSource, TBaseSource> = any,
  TBaseDestination extends BaseOf<TDestination, TBaseDestination> = any
>(
  mapping: Mapping<TSource, TDestination, TBaseSource, TBaseDestination>
): Array<
  [
    string,
    MappingProperty<TDestination, TSource, ReturnType<Selector<TSource>>>
  ]
> {
  const model = instantiate(mapping[MappingClassId.models][0]);
  const proto = Object.getPrototypeOf(model);
  const reversedProps: Array<[
    string,
    MappingProperty<TDestination, TSource, ReturnType<Selector<TSource>>>
  ]> = [];

  const props = mapping[MappingClassId.props];
  let i = props.length;
  while (i--) {
    const { paths, transformation } = props[i][1];
    const [destPath, sourcePath] = paths;

    /**
     * 1: TransformationType.MapFrom
     * 4: TransformationType.MapWith
     */
    if (!sourcePath && transformation.type !== 1 && transformation.type !== 4) {
      continue;
    }

    let path = '';
    if (sourcePath) {
      path = sourcePath;
    } else if (
      isThisMemberMap<MapWithFunction, MapFromFunction>(
        transformation.mapFn,
        1,
        4
      )
    ) {
      path = getMemberPath(transformation.mapFn[1]);
    }

    if (
      (!model.hasOwnProperty(path) && !proto.hasOwnProperty(path)) ||
      reversedProps.some(([propPath]) => propPath === path)
    ) {
      continue;
    }

    reversedProps.push([
      path,
      Object.seal({
        paths: [path, destPath],
        transformation: {
          type: 6, // 6 is TransformationType.MapInitialize.
          preCond: undefined,
          mapFn: mapInitialize(
            mapping[MappingClassId.conventions][0] ? undefined : null,
            destPath
          ),
        },
      }),
    ]);
  }

  return reversedProps;
}
