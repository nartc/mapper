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

        return sourcePropNameParts
            .map((p) => p.toLowerCase())
            .join(this.separatorCharacter);
    }
}
