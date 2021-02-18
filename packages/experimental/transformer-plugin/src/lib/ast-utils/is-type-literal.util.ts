import * as tss from 'typescript/lib/tsserverlibrary';

export function isTypeLiteral(type: tss.Type): boolean {
  const symbol = type.getSymbol();
  if (!symbol) {
    return false;
  }
  return symbol.getFlags() === tss.SymbolFlags.TypeLiteral;
}
