import { Selector } from '../types';

export function getMemberPath(fn: Selector): string {
  const fnString = fn.toString();
  if (isArrowFn(fnString)) {
    return getPathFromSelector(removeExtraForArrow(fnString));
  }
  return getPathFromSelector(removeExtraForFunction(fnString));
}

function isArrowFn(fnString: string): boolean {
  return /^[^{]+?=>/gm.test(fnString);
}

function removeExtraForArrow(fnString: string): string[] {
  const _parts = fnString.replace(/(?:\s|;|{|}|\(|\)|)+/gm, '').split(/=>(.+)/);
  const _returnPart = _parts[1];
  const _returnMatches = _returnPart.match(/return/g);

  if (_returnMatches?.length && _returnMatches.length > 1) {
    return [_parts[0]].concat(
      ..._returnPart.split(/return(.+)/).filter(Boolean)
    );
  }

  return _parts;
}

function removeExtraForFunction(fnString: string): string[] {
  return fnString
    .replace(/(?:\s|function|;|{|}|\(|\)|)+/gm, '')
    .split(/return(.+)/);
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
