import { getProfileConfigurationContext } from '../symbols';
import type { Mapper, MappingConfiguration, MappingProfile } from '../types';

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
