import * as tss from 'typescript/lib/tsserverlibrary';
import { isDynamicallyAdded } from './is-dynamically-added.util';

export function getDecoratorName(decorator: tss.Decorator): string | undefined {
  const isDecoratorFactory =
    decorator.expression.kind === tss.SyntaxKind.CallExpression;
  if (isDecoratorFactory) {
    const callExpression = decorator.expression;
    const expression = (callExpression as tss.CallExpression).expression;
    const identifier = expression as tss.Identifier;
    if (isDynamicallyAdded(identifier)) {
      return undefined;
    }

    return getIdentifierFromExpression(expression).getText();
  }
  return getIdentifierFromExpression(decorator.expression).getText();
}

export function getNameFromExpression(
  expression: tss.LeftHandSideExpression
): tss.Identifier | tss.LeftHandSideExpression {
  if (
    expression &&
    expression.kind === tss.SyntaxKind.PropertyAccessExpression
  ) {
    return (expression as tss.PropertyAccessExpression).name as tss.Identifier;
  }
  return expression;
}

export function getIdentifierFromExpression(
  expression: tss.LeftHandSideExpression
): tss.Identifier {
  const identifier = getNameFromExpression(expression);
  if (identifier && identifier.kind !== tss.SyntaxKind.Identifier) {
    throw new Error();
  }
  return identifier as tss.Identifier;
}

export function getText(
  type: tss.Type,
  typeChecker: tss.TypeChecker,
  enclosingNode?: tss.Node,
  typeFormatFlags?: tss.TypeFormatFlags
): string {
  if (!typeFormatFlags) {
    typeFormatFlags = getDefaultTypeFormatFlags(enclosingNode);
  }
  const compilerNode = !enclosingNode ? undefined : enclosingNode;
  return typeChecker.typeToString(type, compilerNode, typeFormatFlags);
}

export function getDefaultTypeFormatFlags(enclosingNode?: tss.Node): number {
  let formatFlags =
    tss.TypeFormatFlags.UseTypeOfFunction |
    tss.TypeFormatFlags.NoTruncation |
    tss.TypeFormatFlags.UseFullyQualifiedType |
    tss.TypeFormatFlags.WriteTypeArgumentsOfSignature;
  if (
    enclosingNode &&
    enclosingNode.kind === tss.SyntaxKind.TypeAliasDeclaration
  )
    formatFlags |= tss.TypeFormatFlags.InTypeAlias;
  return formatFlags;
}
