import type { MappingProfile } from '@automapper/core';
import { fromValue } from '@automapper/core';
import {
  Foo,
  FooBar,
  FooBarBaz,
  FooBarBazDto,
  FooBarBazQux,
  FooBarBazQuxDto,
  FooBarDto,
  FooDto,
  FooFoo,
  FooFooDto,
  FooFooFoo,
  FooFooFooDto,
} from '../models/deep-nest';

export const deepNestedFooFooFooProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(FooFooFoo, FooFooFooDto)
    .forMember((dest) => dest.foo, fromValue('FooFooFoo Custom Value'));
  mapper
    .createMap(FooFoo, FooFooDto)
    .forMember((dest) => dest.foo.foo, fromValue('FooFoo Custom Value'));
  mapper
    .createMap(Foo, FooDto)
    .forMember((dest) => dest.foo.foo.foo, fromValue('Foo Custom Value'));
};

export const deepNestedFooBarBazQuxProfile: MappingProfile = (mapper) => {
  mapper.createMap(FooBarBazQux, FooBarBazQuxDto);
  mapper.createMap(FooBarBaz, FooBarBazDto);
  mapper.createMap(FooBar, FooBarDto);
};
