import type { Mapper, MappingProfile } from '@automapper/core';
import { addProfile } from '@automapper/core';

export abstract class AutomapperProfile {
    protected constructor(protected mapper: Mapper) {
        Promise.resolve().then(() => addProfile(mapper, this.profile));
    }

    abstract get profile(): MappingProfile;
}
