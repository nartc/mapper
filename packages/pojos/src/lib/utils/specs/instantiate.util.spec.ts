// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  createSpyObject,
  resetAllWhenMocks,
  when,
} from '@automapper/test-util';
import { PojosMetadataStorage } from '../../storages';
import { instantiate } from '../instantiate.util';

describe('instantiate', () => {
  const mockedMetadataStorage = createSpyObject(PojosMetadataStorage, {
    getMetadata: jest.fn(),
  });

  interface Bar {
    bar: string;
    date: Date;
  }

  interface Foo {
    foo: string;
    bar: Bar;
  }

  const defaultBar: Bar = {
    bar: 'defaultBar',
    date: new Date('10/14/1991'),
  };
  const defaultFoo: Foo = {
    foo: 'defaultFoo',
    bar: defaultBar,
  };

  let parameterizedInstantiate: () => [Foo, unknown[]?];

  describe('without default value', () => {
    beforeEach(() => {
      parameterizedInstantiate = () =>
        instantiate(mockedMetadataStorage, 'Foo');
    });

    afterEach(() => {
      resetAllWhenMocks();
    });

    it('should return empty object when meta is empty', () => {
      mockEmpty();

      const result = parameterizedInstantiate();
      expect(result).toEqual([{}]);
    });

    it('should return proper object with metadata', () => {
      mockMetadata();

      const result = parameterizedInstantiate();
      expect(result).toEqual([
        { foo: undefined, bar: { bar: undefined, date: expect.any(Date) } },
        [['bar', 'Bar']],
      ]);
    });
  });

  describe('with default value', () => {
    beforeEach(() => {
      parameterizedInstantiate = () =>
        instantiate(mockedMetadataStorage, 'Foo', defaultFoo);
    });

    afterEach(() => {
      resetAllWhenMocks();
    });

    it('should return raw default value if meta is empty', () => {
      mockEmpty();

      const result = parameterizedInstantiate();

      expect(result).toEqual([defaultFoo]);
    });

    it('should return proper object with metadata', () => {
      mockMetadata();

      const result = parameterizedInstantiate();

      expect(result).toEqual([defaultFoo, [['bar', 'Bar']]]);
    });
  });

  function mockEmpty() {
    when(mockedMetadataStorage.getMetadata)
      .calledWith('Foo')
      .mockReturnValueOnce([]);
  }

  function mockMetadata() {
    when(mockedMetadataStorage.getMetadata)
      .calledWith('Foo')
      .mockReturnValueOnce([
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['foo', () => String as any],
        ['bar', () => 'Bar'],
      ]);

    when(mockedMetadataStorage.getMetadata)
      .calledWith('Bar')
      .mockReturnValueOnce([
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ['bar', () => String as any],
        ['date', () => Date],
      ]);
  }
});
