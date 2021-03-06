export function isDestinationPathOnSource(
  sourceProto: Record<string, unknown>
) {
  return (sourceObj: any, sourcePath: string) => {
    return !(
      !sourceObj.hasOwnProperty(sourcePath) &&
      !sourceProto.hasOwnProperty(sourcePath) &&
      !Object.getPrototypeOf(sourceObj).hasOwnProperty(sourcePath)
    );
  };
}
