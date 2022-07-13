import type { NamingConvention } from '../types';

/**
 * CamelCaseNamingConvention
 *
 * @example thisIsCamelCase
 */
export class CamelCaseNamingConvention implements NamingConvention {
    separatorCharacter = '';
    splittingExpression = /(^[a-z]+(?=$|[A-Z][a-z0-9]+)|[A-Z]?[a-z0-9]+)/;

    transformPropertyName(sourceNameParts: string[]): string {
        let result = '';

        for (let i = 0, len = sourceNameParts.length; i < len; i++) {
            if (i === 0) {
                result += sourceNameParts[i].charAt(0).toLowerCase();
            } else {
                result += sourceNameParts[i].charAt(0).toUpperCase();
            }

            result += sourceNameParts[i].substring(1);
        }

        return result;
    }
}
