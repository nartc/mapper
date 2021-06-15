import { isClass } from './is-class.util';

export function isMultipartSourcePathsInSource(
  sourcePaths: string[],
  sourceInstance: Record<string, unknown>
) {
  return !(
    sourcePaths.length > 1 &&
    (!sourceInstance.hasOwnProperty(sourcePaths[0]) ||
      (sourceInstance[sourcePaths[0]] &&
        // eslint-disable-next-line @typescript-eslint/ban-types
        isClass(sourceInstance[sourcePaths[0]] as Function)))
  );
}
