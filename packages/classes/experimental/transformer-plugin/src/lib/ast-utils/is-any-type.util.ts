import * as tss from 'typescript/lib/tsserverlibrary';

export function isAnyType(
  type: tss.Type,
  typeChecker: tss.TypeChecker,
  node: tss.PropertyDeclaration | tss.GetAccessorDeclaration
): boolean {
  return (
    typeChecker.typeToString(type) === 'any' &&
    !!node.type &&
    node.type.kind === tss.SyntaxKind.AnyKeyword
  );
}
