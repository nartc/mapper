import type { MappingProfile } from '@automapper/core';
import {
  CustomKeyBar,
  CustomKeyBarVm,
  CustomKeyFoo,
  CustomKeyFooVm,
} from '../models/custom-keys';

export const customKeyProfile: MappingProfile = (mapper) => {
  mapper.createMap(CustomKeyBar, CustomKeyBarVm);
  mapper.createMap(CustomKeyFoo, CustomKeyFooVm);
};
