import { ERROR_HANDLER } from './symbols';
import type { Mapper } from './types';

export function getErrorHandler(mapper: Mapper) {
    return mapper[ERROR_HANDLER];
}
