import { NamingConvention } from '../types';

export class SnakeCaseNamingConvention implements NamingConvention {
  public separatorCharacter: string = '_';
  splittingExpression: RegExp = /_/;

  public transformPropertyName(sourcePropNameParts: string[]): string {
    const len = sourcePropNameParts.length;

    if (len <= 1) {
      return sourcePropNameParts[0].toLowerCase() || '';
    }

    return sourcePropNameParts
      .map(p => p.toLowerCase())
      .join(this.separatorCharacter);
  }
}
