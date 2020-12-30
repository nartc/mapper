import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';
import { pojos } from '@automapper/pojos';
import type { CreateMapperOptions, Mapper } from '@automapper/types';

export function setup(
  name: string,
  pluginInitializer: CreateMapperOptions['pluginInitializer'],
  namingConventions?: CreateMapperOptions['namingConventions']
): [Mapper, jest.Mock] {
  const spiedErrorHandle = jest.fn();
  const mapper: Mapper = createMapper({
    name,
    pluginInitializer,
    namingConventions,
    errorHandle: { handle: spiedErrorHandle },
  });

  afterEach(() => {
    mapper?.dispose();
    spiedErrorHandle.mockReset();
  });

  return [mapper, spiedErrorHandle];
}

export function setupClasses(
  name: string,
  namingConventions?: CreateMapperOptions['namingConventions']
): [Mapper, jest.Mock] {
  return setup(name, classes, namingConventions);
}

export function setupPojos(
  name: string,
  namingConventions?: CreateMapperOptions['namingConventions']
): [Mapper, jest.Mock] {
  return setup(name, pojos, namingConventions);
}
