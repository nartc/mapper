export function isDestinationPathOnSource(
  sourceProto: Record<string, unknown>
) {
  return (sourceObj: any, sourcePath: string[]) => {
    return (
      sourcePath.length === 1 &&
      !(
        !sourceObj.hasOwnProperty(sourcePath[0]) &&
        !sourceProto.hasOwnProperty(sourcePath[0]) &&
        !Object.getPrototypeOf(sourceObj).hasOwnProperty(sourcePath[0])
      )
    );
  };
}
