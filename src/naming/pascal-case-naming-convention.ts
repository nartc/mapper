import { NamingConvention } from '../types';

export class PascalCaseNamingConvention implements NamingConvention {
  public separatorCharacter = '';
  public splittingExpression: RegExp = /(^[A-Z]+(?=$|[A-Z]{1}[a-z0-9]+)|[A-Z]?[a-z0-9]+)/;

  public transformPropertyName(sourceNameParts: string[]): string {
    let result = '';
    const len = sourceNameParts.length;

    for (let i = 0; i < len; i++) {
      result +=
        sourceNameParts[i].charAt(0).toUpperCase() +
        sourceNameParts[i].substr(1);
    }

    return result;
  }
}
