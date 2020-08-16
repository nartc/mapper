import { Selector } from '../types';

export function getMemberPath(fn: Selector): string {
  const fnString = fn.toString();
  if (/^[^{]+?=>/gm.test(fnString)) {
    let value: string[];
    const _parts = fnString
      .replace(/(?:\s|;|{|}|\(|\)|)+/gm, '')
      .split(/=>(.+)/);
    const _returnPart = _parts[1];
    const _returnMatches = _returnPart.match(/return/g);

    if (_returnMatches?.length && _returnMatches.length > 1) {
      value = [_parts[0]].concat(
        ..._returnPart.split(/return(.+)/).filter(Boolean)
      );
    } else {
      value = _parts;
    }

    return getPathFromSelector(value);
  }
  return getPathFromSelector(
    fnString.replace(/(?:\s|function|;|{|}|\(|\)|)+/gm, '').split(/return(.+)/)
  );
}

function getPathFromSelector(fnParts: string[]): string {
  const [, ...parts] = fnParts
    .join('')
    .split(new RegExp(`${fnParts[0]}\\.{1}`, 'g'))
    .filter(Boolean);

  if (parts.length === 1) {
    return parts.pop() as string;
  }

  return '';
}
