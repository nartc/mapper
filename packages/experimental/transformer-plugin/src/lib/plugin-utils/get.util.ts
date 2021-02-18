import * as tss from 'typescript/lib/tsserverlibrary';
import {
  getDecoratorName,
  getText,
  isArrayType,
  isBoolean,
  isDate,
  isNumber,
  isNumberEnum,
  isString,
  isStringEnum,
} from '../ast-utils';

export function getDecoratorOrUndefinedByNames(
  names: string[],
  factory: tss.NodeFactory,
  decorators?: tss.NodeArray<tss.Decorator>
): tss.Decorator | undefined {
  return (decorators || factory.createNodeArray()).find((item) =>
    names.includes(getDecoratorName(item) as string)
  );
}

export function getTypeReferenceAsString(
  type: tss.Type,
  typeChecker: tss.TypeChecker
): string | undefined {
  if (isArrayType(type)) {
    const [arrayType] = (type as tss.TypeReference).typeArguments;
    const elementType = getTypeReferenceAsString(arrayType, typeChecker);
    return !elementType ? undefined : elementType;
  }

  if (isBoolean(type)) {
    return Boolean.name;
  }

  if (isNumber(type) || isNumberEnum(type)) {
    return Number.name;
  }

  if (isString(type) || isStringEnum(type)) {
    return String.name;
  }

  if (isDate(type)) {
    return Date.name;
  }

  if (type.isClass()) {
    return getText(type, typeChecker);
  }

  return undefined;
}
