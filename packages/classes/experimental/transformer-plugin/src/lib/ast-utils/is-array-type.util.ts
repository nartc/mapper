import * as tss from 'typescript/lib/tsserverlibrary';

export function isArrayType(type: tss.Type): boolean {
  const symbol = type.getSymbol();
  if (!symbol) {
    return false;
  }
  return (
    symbol.getName() === 'Array' &&
    (type as tss.TypeReference).typeArguments.length === 1
  );
}
