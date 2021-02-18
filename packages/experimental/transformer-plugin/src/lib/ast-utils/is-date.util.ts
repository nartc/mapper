import * as tss from 'typescript/lib/tsserverlibrary';

export function isDate(type: tss.Type) {
  return type.symbol && type.symbol.escapedName === 'Date';
}
