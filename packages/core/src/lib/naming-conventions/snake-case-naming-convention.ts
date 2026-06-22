import type { NamingConvention } from '../types';

/**
 * SnakeCaseNamingConvention
 *
 * @example this_is_snake_case
 */
export class SnakeCaseNamingConvention implements NamingConvention {
    separatorCharacter = '_';
    splittingExpression = /_/;

    public transformPropertyName(sourcePropNameParts: string[]): string {
        const len = sourcePropNameParts.length;

        if (len <= 1) {
            return sourcePropNameParts[0].toLowerCase() || '';
        }

        // indexed build instead of map().join() — one pass, no intermediate
        // array (compile-time; byte-identical output).
        let result = sourcePropNameParts[0].toLowerCase();
        for (let i = 1; i < len; i++) {
            result += this.separatorCharacter + sourcePropNameParts[i].toLowerCase();
        }
        return result;
    }
}
