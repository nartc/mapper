import { Inject } from '@nestjs/common';
import { getMapperToken } from './get-mapper-token';

export const InjectMapper = (name?: string) => Inject(getMapperToken(name));
