import type { Converter, Selector } from '../types';

export function toSelector(input: Selector | Converter): Selector {
    if ('convert' in input) return input.convert.bind(input);
    return input;
}
