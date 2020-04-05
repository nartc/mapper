export function getProto(node: any) {
  return (
    Object.getPrototypeOf(node) || node.constructor.prototype || node.__proto__
  );
}
