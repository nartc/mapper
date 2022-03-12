import { PROFILE_CONFIGURATION_CONTEXT } from './symbols';
import type { Mapper, MappingConfiguration, MappingProfile } from './types';

export function getProfileConfigurationContext(mapper: Mapper) {
    return mapper[PROFILE_CONFIGURATION_CONTEXT];
}

export function addProfile(
    mapper: Mapper,
    profile: MappingProfile,
    ...mappingConfigurations: MappingConfiguration[]
): void {
    mappingConfigurations.forEach((mappingConfiguration) => {
        getProfileConfigurationContext(mapper).add(mappingConfiguration);
    });

    profile.apply({ profileName: profile.name }, [mapper]);

    getProfileConfigurationContext(mapper).clear();
}
