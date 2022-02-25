import { MappingProfile } from '@automapper/core';
import { Foo, FooDto } from '../models/foo';

export const simpleFooProfile: MappingProfile = (mapper) => {
  mapper.createMap(Foo, FooDto);
};
