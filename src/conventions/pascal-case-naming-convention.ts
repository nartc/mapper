import { NamingConvention } from '../types';

/**
 * PascalCase naming convention
 */
export class PascalCaseNamingConvention implements NamingConvention {
  separatorCharacter = '';
  splittingExpression: RegExp = /(^[A-Z]+(?=$|[A-Z]{1}[a-z0-9]+)|[A-Z]?[a-z0-9]+)/;

  public transformPropertyName(sourceNameParts: string[]): string {
    let result = '';

    for (let i = 0, len = sourceNameParts.length; i < len; i++) {
      result +=
        sourceNameParts[i].charAt(0).toUpperCase() +
        sourceNameParts[i].substr(1);
    }

    return result;
  }
}
