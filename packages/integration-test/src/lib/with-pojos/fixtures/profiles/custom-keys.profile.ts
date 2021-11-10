import { MappingProfile } from '@automapper/core';
import {
  createCustomKeyFooMetadata,
  CustomKeyBar,
  CustomKeyBarVm,
  CustomKeyFoo,
  CustomKeyFooVm,
} from '../interfaces/custom-keys.interface';

export const customKeyProfile: MappingProfile = (mapper) => {
  createCustomKeyFooMetadata();

  mapper.createMap<CustomKeyFoo, CustomKeyFooVm>(
    'CustomKeyFoo',
    'CustomKeyFooVm'
  );

  mapper.createMap<CustomKeyBar, CustomKeyBarVm>(
    'CustomKeyBar',
    'CustomKeyBarVm'
  );
};
