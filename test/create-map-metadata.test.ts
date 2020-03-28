import { createMapMetadata } from '../src';
import { instantiate } from '../src/core';
import { Profile } from './fixtures/models/profile';
import { UserNoDecorator, UserNoDecoratorTwo } from './fixtures/models/user';

describe('CreateMapMetadata', () => {
  it('should create and store metadata', () => {
    const userNoDecorator = instantiate(UserNoDecorator);
    expect(userNoDecorator.firstName).toBeFalsy();
    expect(userNoDecorator.lastName).toBeFalsy();
    expect(userNoDecorator.isAdult).toBeFalsy();
    expect(userNoDecorator.age).toBeFalsy();
    expect(userNoDecorator.birthday).not.toBeInstanceOf(Date);
    expect(userNoDecorator.addresses).not.toBeInstanceOf(Array);
    expect(userNoDecorator.profile).not.toBeInstanceOf(Profile);
    createMapMetadata(UserNoDecorator, {
      firstName: String,
      lastName: String,
      isAdult: Boolean,
      birthday: Date,
      age: Number,
      addresses: [],
      profile: Profile,
    });
    const userNoDecorator2 = instantiate(UserNoDecorator);
    expect(userNoDecorator2.firstName).toBeUndefined();
    expect(userNoDecorator2.lastName).toBeUndefined();
    expect(userNoDecorator2.isAdult).toBeUndefined();
    expect(userNoDecorator2.age).toBeUndefined();
    expect(userNoDecorator2.birthday).toBeInstanceOf(Date);
    expect(userNoDecorator2.addresses).toBeInstanceOf(Array);
    expect(userNoDecorator2.profile).toBeInstanceOf(Profile);
  });

  it('should exit if an empty metadataOptions is passed in', () => {
    const userNoDecorator = instantiate(UserNoDecoratorTwo);
    createMapMetadata(UserNoDecorator, {});
    expect(userNoDecorator.firstName).toBeFalsy();
    expect(userNoDecorator.lastName).toBeFalsy();
    expect(userNoDecorator.age).toBeFalsy();
  });
});
