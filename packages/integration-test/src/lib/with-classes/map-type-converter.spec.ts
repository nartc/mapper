import { setupClasses } from '../setup.spec';
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
} from './fixtures/models/type-converter';
import {
  CamelCaseNamingConvention,
  PascalCaseNamingConvention,
  SnakeCaseNamingConvention,
} from '@automapper/core';

describe('Map - TypeConverter', () => {
  describe('basic', () => {
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

  describe('camel - snake', () => {
    const [mapper] = setupClasses('typeConverterMapper', {
      source: new CamelCaseNamingConvention(),
      destination: new SnakeCaseNamingConvention(),
    });

    it('should map correctly', () => {
      mapper.addProfile(typeConverterSnakeProfile);

      const source = new TypeConverterCamelSource();
      source.valueOne = '123';
      source.valueTwo = '10/14/1991';

      const destination = mapper.map(
        source,
        TypeConverterSnakeDestination,
        TypeConverterCamelSource
      );
      expect(destination.value_one).toEqual(123);
      expect(destination.value_two).toEqual(new Date(source.valueTwo));
    });
  });

  describe('camel - pascal', () => {
    const [mapper] = setupClasses('typeConverterMapper', {
      source: new CamelCaseNamingConvention(),
      destination: new PascalCaseNamingConvention(),
    });

    it('should map correctly', () => {
      mapper.addProfile(typeConverterPascalProfile);

      const source = new TypeConverterCamelSource();
      source.valueOne = '123';
      source.valueTwo = '10/14/1991';

      const destination = mapper.map(
        source,
        TypeConverterPascalDestination,
        TypeConverterCamelSource
      );
      expect(destination.ValueOne).toEqual(123);
      expect(destination.ValueTwo).toEqual(new Date(source.valueTwo));
    });
  });
});
