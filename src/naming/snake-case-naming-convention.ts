import { NamingConvention } from '../types';

export class SnakeCaseNamingConvention implements NamingConvention {
  public separatorCharacter: string = '_';
  splittingExpression: RegExp = /_/;

  public transformPropertyName(sourcePropNameParts: string[]): string {
    const len = sourcePropNameParts.length;

    if (len <= 1) {
      return sourcePropNameParts[0] || '';
    }

    let result = '';
    for (let i = 0; i < len; i++) {
      const part = sourcePropNameParts[i].toLowerCase();
      result += i === len - 1 ? part : part.concat('_');
    }

    return result;
  }
}
