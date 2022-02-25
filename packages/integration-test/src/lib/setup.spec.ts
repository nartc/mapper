import { classes } from '@automapper/classes';
import type { CreateMapperOptions, Mapper } from '@automapper/core';
import { createMapper } from '@automapper/core';
import { mikro } from '@automapper/mikro';
import { pojos } from '@automapper/pojos';

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
    errorHandler: { handle: spiedErrorHandle },
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

export function setupMikro(
  name: string,
  namingConventions?: CreateMapperOptions['namingConventions']
): [Mapper, jest.Mock] {
  return setup(name, mikro, namingConventions);
}
