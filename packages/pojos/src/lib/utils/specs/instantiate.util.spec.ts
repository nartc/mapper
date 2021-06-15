import { createSpyObj } from 'jest-createspyobj';
import { resetAllWhenMocks, when } from 'jest-when';
import { PojosMetadataStorage } from '../../storages';
import { instantiate } from '../instantiate.util';

describe('instantiate', () => {
  const mockedMetadataStorage = createSpyObj<PojosMetadataStorage>(
    PojosMetadataStorage,
    ['getMetadata']
  );

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
        { foo: undefined, bar: { bar: undefined, date: undefined } },
        [[['bar'], 'Bar']],
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

      expect(result).toEqual([defaultFoo, [[['bar'], 'Bar']]]);
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
        [['foo'], () => String as unknown as string],
        [['bar'], () => 'Bar'],
      ]);

    when(mockedMetadataStorage.getMetadata)
      .calledWith('Bar')
      .mockReturnValueOnce([
        [['bar'], () => String as unknown as string],
        [['date'], () => Date as unknown as Date],
      ]);
  }
});
