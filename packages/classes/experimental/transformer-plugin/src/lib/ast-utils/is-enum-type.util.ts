import * as tss from 'typescript/lib/tsserverlibrary';
import { hasFlag } from './has-flag.util';

export function isEnumType(type: tss.Type): boolean {
  if (hasFlag(type, tss.TypeFlags.Enum)) {
    return true;
  }

  if (hasFlag(type, tss.TypeFlags.EnumLiteral) && !type.isUnion()) return false;

  const symbol = type.getSymbol();
  if (symbol == null) {
    return false;
  }
  const { valueDeclaration } = symbol;
  return (
    valueDeclaration != null &&
    valueDeclaration.kind === tss.SyntaxKind.EnumDeclaration
  );
}

export function isStringEnum(type: tss.Type): boolean {
  const isEnum = isEnumType(type);
  const valueDeclaration = type.getSymbol()
    ?.valueDeclaration as tss.EnumDeclaration;

  return (
    (isEnum &&
      valueDeclaration?.members?.some(
        (member: tss.EnumMember) => member.initializer != null
      )) ||
    false
  );
}

export function isNumberEnum(type: tss.Type): boolean {
  const isEnum = isEnumType(type);
  const valueDeclaration = type.getSymbol()
    ?.valueDeclaration as tss.EnumDeclaration;

  return (
    (isEnum &&
      valueDeclaration?.members?.some(
        (member: tss.EnumMember) => member.initializer == null
      )) ||
    false
  );
}
