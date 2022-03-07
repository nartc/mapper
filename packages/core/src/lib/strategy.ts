import { STRATEGY } from './symbols';
import type { Mapper } from './types';

export function getStrategy(mapper: Mapper) {
    return mapper[STRATEGY];
}
