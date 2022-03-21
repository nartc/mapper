import type {
    Mapper,
    MappingConfiguration,
    MappingProfile,
} from '@automapper/core';
import { addProfile } from '@automapper/core';

export abstract class AutomapperProfile {
    protected constructor(protected mapper: Mapper) {
        Promise.resolve().then(() =>
            addProfile(mapper, this.profile, ...this.mappingConfigurations)
        );
    }

    abstract get profile(): MappingProfile;

    protected get mappingConfigurations(): MappingConfiguration[] {
        return [];
    }
}
