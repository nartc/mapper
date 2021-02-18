import * as tss from 'typescript/lib/tsserverlibrary';

export function isDynamicallyAdded(identifier: tss.Node): boolean {
  return identifier && !identifier.parent && identifier.pos === -1;
}
