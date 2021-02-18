import * as tss from 'typescript/lib/tsserverlibrary';

export function isNullableUnionType(type: tss.Type): boolean {
  return (
    type.isUnion() &&
    ((type as unknown) as { isNullableType: () => boolean })?.isNullableType()
  );
}
