import { isClass } from './is-class.util';

export function isMultipartSourcePathsInSource(
  dottedSourcePaths: string[],
  sourceInstance: Record<string, unknown>
) {
  return !(
    dottedSourcePaths.length > 1 &&
    (!sourceInstance.hasOwnProperty(dottedSourcePaths[0]) ||
      (sourceInstance[dottedSourcePaths[0]] &&
        // eslint-disable-next-line @typescript-eslint/ban-types
        isClass((sourceInstance[dottedSourcePaths[0]] as unknown) as Function)))
  );
}
