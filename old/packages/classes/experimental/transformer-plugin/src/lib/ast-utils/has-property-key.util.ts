import * as tss from 'typescript/lib/tsserverlibrary';
import { isDynamicallyAdded } from './is-dynamically-added.util';

export function hasPropertyKey(
  key: string,
  properties: tss.NodeArray<tss.PropertyAssignment>
): boolean {
  return properties
    .filter((item) => !isDynamicallyAdded(item))
    .some((item) => item.name.getText() === key);
}
