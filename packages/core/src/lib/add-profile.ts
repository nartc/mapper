import type { Mapper, MappingProfile } from './types';

export function addProfile(mapper: Mapper, profile: MappingProfile): void {
    profile(mapper);
}
