/**
 * describe('Map - TypeConverter', () => {
  const [mapper] = setupClasses('typeConverterMapper');

  it('should map correctly', () => {
    mapper.addProfile(typeConverterProfile);

    const source = new TypeConverterSource();
    source.value1 = '123';
    source.value2 = '10/14/1991';
    source.value3 = 'truthy';

    const destination = mapper.map(
      source,
      TypeConverterDestination,
      TypeConverterSource
    );
    expect(destination.value1).toEqual(123);
    expect(destination.value2).toEqual(new Date(source.value2));
    expect(destination.value3).toEqual(true);
  });
});
 */

import { setupPojos } from '../setup.spec';
import {
  typeConverterPascalProfile,
  typeConverterProfile,
  typeConverterSnakeProfile,
} from './fixtures/profiles/type-converter.profile';
import {
  TypeConverterCamelSource,
  TypeConverterDestination,
  TypeConverterPascalDestination,
  TypeConverterSnakeDestination,
  TypeConverterSource,
} from './fixtures/interfaces/type-converter.interface';
import {
  CamelCaseNamingConvention,
  PascalCaseNamingConvention,
  SnakeCaseNamingConvention,
} from '@automapper/core';

describe('Map - TypeConverter', () => {
  describe('basic', () => {
    const [mapper] = setupPojos('typeConverterMapper');

    it('should map correctly', () => {
      mapper.addProfile(typeConverterProfile);

      const source: TypeConverterSource = {
        value1: '123',
        value2: '10/14/1991',
        value3: 'truthy',
      };

      const destination = mapper.map<
        TypeConverterSource,
        TypeConverterDestination
      >(source, 'TypeConverterDestination', 'TypeConverterSource');

      expect(destination.value1).toEqual(123);
      expect(destination.value2).toEqual(new Date(source.value2));
      expect(destination.value3).toEqual(true);
    });
  });

  describe('camel - snake', () => {
    const [mapper] = setupPojos('typeConverterMapper', {
      source: new CamelCaseNamingConvention(),
      destination: new SnakeCaseNamingConvention(),
    });

    it('should map correctly', () => {
      mapper.addProfile(typeConverterSnakeProfile);

      const source = {} as TypeConverterCamelSource;
      source.valueOne = '123';
      source.valueTwo = '10/14/1991';

      const destination = mapper.map<
        TypeConverterCamelSource,
        TypeConverterSnakeDestination
      >(source, 'TypeConverterSnakeDestination', 'TypeConverterCamelSource');
      expect(destination.value_one).toEqual(123);
      expect(destination.value_two).toEqual(new Date(source.valueTwo));
    });
  });

  describe('camel - pascal', () => {
    const [mapper] = setupPojos('typeConverterMapper', {
      source: new CamelCaseNamingConvention(),
      destination: new PascalCaseNamingConvention(),
    });

    it('should map correctly', () => {
      mapper.addProfile(typeConverterPascalProfile);

      const source = {} as TypeConverterCamelSource;
      source.valueOne = '123';
      source.valueTwo = '10/14/1991';

      const destination = mapper.map<
        TypeConverterCamelSource,
        TypeConverterPascalDestination
      >(source, 'TypeConverterPascalDestination', 'TypeConverterCamelSource');
      expect(destination.ValueOne).toEqual(123);
      expect(destination.ValueTwo).toEqual(new Date(source.valueTwo));
    });
  });
});
