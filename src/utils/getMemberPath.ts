import { Selector } from '../types';

/**
 * https://github.com/IRCraziestTaxi/ts-simple-nameof
 * This implementation is copied from the linked library.
 *
 * Old implementation:
 *
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
 */
export function getMemberPath(fn: Selector): string {
  const fnString = fn.toString();

  // ES6 prop selector:
  // "x => x.prop"
  if (fnString.includes('=>')) {
    return cleanseAssertionOperators(
      fnString.substring(fnString.indexOf('.') + 1)
    );
  }

  // ES5 prop selector:
  // "function (x) { return x.prop; }"
  // webpack production build excludes the spaces and optional trailing semicolon:
  //   "function(x){return x.prop}"
  // FYI - during local dev testing i observed carriage returns after the curly brackets as well
  // Note by maintainer: See https://github.com/IRCraziestTaxi/ts-simple-nameof/pull/13#issuecomment-567171802 for
  // explanation of this regex.
  const matchRegex = /function\s*\(\w+\)\s*{[\r\n\s]*return\s+\w+\.((\w+\.)*(\w+))/i;

  const es5Match = fnString.match(matchRegex);

  if (es5Match) {
    return es5Match[1]!;
  }

  return '';
}

function cleanseAssertionOperators(parsedName: string): string {
  return parsedName.replace(/[?!]/g, '').replace(/(?:\s|;|{|}|\(|\)|)+/gm, '');
}
