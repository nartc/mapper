import type { NamingConvention } from '../types';

/**
 * PascalCaseNamingConvention
 *
 * @example ThisIsPascalCase
 */
export class PascalCaseNamingConvention implements NamingConvention {
    separatorCharacter = '';
    splittingExpression = /(^[A-Z]+(?=$|[A-Z][a-z0-9]+)|[A-Z]?[a-z0-9]+)/;

    public transformPropertyName(sourceNameParts: string[]): string {
        let result = '';

        for (let i = 0, len = sourceNameParts.length; i < len; i++) {
            result +=
                sourceNameParts[i].charAt(0).toUpperCase() +
                sourceNameParts[i].substring(1);
        }

        return result;
    }
}
