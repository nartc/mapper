import type { Selector } from '@automapper/types';

// TODO: support odd properties like: 'odd-property', 'odd.property'?
export function getMemberPath(fn: Selector): string {
  const fnString = fn.toString();

  // ES6 prop selector:
  // "x => x.prop"
  if (fnString.includes('=>')) {
    const cleaned = cleanseAssertionOperators(
      fnString.substring(fnString.indexOf('.') + 1)
    );

    if (cleaned.includes('=>')) return '';
    return cleaned;
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return es5Match[1]!;
  }

  return '';
}

function cleanseAssertionOperators(parsedName: string): string {
  return parsedName.replace(/[?!]/g, '').replace(/(?:\s|;|{|}|\(|\)|)+/gm, '');
}
