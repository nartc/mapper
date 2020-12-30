import { mapFrom } from '@automapper/core';
import type { MappingProfile } from '@automapper/types';
import type {
  PascalUser,
  PascalUserVm,
} from '../interfaces/user-pascal.interface';
import { createUserPascalMetadata } from '../interfaces/user-pascal.interface';
import type {
  SnakeUser,
  SnakeUserVm,
} from '../interfaces/user-snake.interface';
import { createUserSnakeMetadata } from '../interfaces/user-snake.interface';
import type { User, UserVm } from '../interfaces/user.interface';
import { createUserMetadata } from '../interfaces/user.interface';

export const userProfile: MappingProfile = (mapper) => {
  createUserMetadata();
  createUserPascalMetadata();
  createUserSnakeMetadata();

  mapper
    .createMap<User, UserVm>('User', 'UserVm')
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
    .createMap<User, PascalUserVm>('User', 'PascalUserVm')
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
    .createMap<User, SnakeUserVm>('User', 'SnakeUserVm')
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
  createUserMetadata();
  createUserPascalMetadata();
  createUserSnakeMetadata();

  mapper
    .createMap<PascalUser, PascalUserVm>('PascalUser', 'PascalUserVm')
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
    .createMap<PascalUser, UserVm>('PascalUser', 'UserVm')
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
    .createMap<PascalUser, SnakeUserVm>('PascalUser', 'SnakeUserVm')
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
  createUserMetadata();
  createUserPascalMetadata();
  createUserSnakeMetadata();

  mapper
    .createMap<SnakeUser, SnakeUserVm>('SnakeUser', 'SnakeUserVm')
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
    .createMap<SnakeUser, UserVm>('SnakeUser', 'UserVm')
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
    .createMap<SnakeUser, PascalUserVm>('SnakeUser', 'PascalUserVm')
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
