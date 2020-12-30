import { mapFrom } from '@automapper/core';
import type { MappingProfile } from '@automapper/types';
import { User, UserVm } from '../models/user';
import { PascalUser, PascalUserVm } from '../models/user-pascal';
import { SnakeUser, SnakeUserVm } from '../models/user-snake';

export const userProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(User, UserVm)
    .forMember(
      (d) => d.first,
      mapFrom((s) => s.firstName)
    )
    .forMember(
      (d) => d.last,
      mapFrom((s) => s.lastName)
    )
    .forMember(
      (d) => d.full,
      mapFrom((s) => s.firstName + ' ' + s.lastName)
    );

  mapper
    .createMap(User, PascalUserVm)
    .forMember(
      (d) => d.First,
      mapFrom((s) => s.firstName)
    )
    .forMember(
      (d) => d.Last,
      mapFrom((s) => s.lastName)
    )
    .forMember(
      (d) => d.Full,
      mapFrom((s) => s.firstName + ' ' + s.lastName)
    );

  mapper
    .createMap(User, SnakeUserVm)
    .forMember(
      (d) => d.first,
      mapFrom((s) => s.firstName)
    )
    .forMember(
      (d) => d.last,
      mapFrom((s) => s.lastName)
    )
    .forMember(
      (d) => d.full,
      mapFrom((s) => s.firstName + ' ' + s.lastName)
    );
};

export const pascalUserProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(PascalUser, PascalUserVm)
    .forMember(
      (d) => d.First,
      mapFrom((s) => s.FirstName)
    )
    .forMember(
      (d) => d.Last,
      mapFrom((s) => s.LastName)
    )
    .forMember(
      (d) => d.Full,
      mapFrom((s) => s.FirstName + ' ' + s.LastName)
    );

  mapper
    .createMap(PascalUser, UserVm)
    .forMember(
      (d) => d.first,
      mapFrom((s) => s.FirstName)
    )
    .forMember(
      (d) => d.last,
      mapFrom((s) => s.LastName)
    )
    .forMember(
      (d) => d.full,
      mapFrom((s) => s.FirstName + ' ' + s.LastName)
    );

  mapper
    .createMap(PascalUser, SnakeUserVm)
    .forMember(
      (d) => d.first,
      mapFrom((s) => s.FirstName)
    )
    .forMember(
      (d) => d.last,
      mapFrom((s) => s.LastName)
    )
    .forMember(
      (d) => d.full,
      mapFrom((s) => s.FirstName + ' ' + s.LastName)
    );
};

export const snakeUserProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(SnakeUser, SnakeUserVm)
    .forMember(
      (d) => d.first,
      mapFrom((s) => s.first_name)
    )
    .forMember(
      (d) => d.last,
      mapFrom((s) => s.last_name)
    )
    .forMember(
      (d) => d.full,
      mapFrom((s) => s.first_name + ' ' + s.last_name)
    );

  mapper
    .createMap(SnakeUser, UserVm)
    .forMember(
      (d) => d.first,
      mapFrom((s) => s.first_name)
    )
    .forMember(
      (d) => d.last,
      mapFrom((s) => s.last_name)
    )
    .forMember(
      (d) => d.full,
      mapFrom((s) => s.first_name + ' ' + s.last_name)
    );

  mapper
    .createMap(SnakeUser, PascalUserVm)
    .forMember(
      (d) => d.First,
      mapFrom((s) => s.first_name)
    )
    .forMember(
      (d) => d.Last,
      mapFrom((s) => s.last_name)
    )
    .forMember(
      (d) => d.Full,
      mapFrom((s) => s.first_name + ' ' + s.last_name)
    );
};
