import type { MappingProfile } from '@automapper/types';
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
