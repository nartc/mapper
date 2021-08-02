import { createSpyObj } from 'jest-createspyobj';
import { resetAllWhenMocks, when } from 'jest-when';
import { ClassInstanceStorage, ClassMetadataStorage } from '../../storages';
import { instantiate } from '../instantiate.util';

describe('instantiate', () => {
  const mockedInstanceStorage = createSpyObj<ClassInstanceStorage>(
    ClassInstanceStorage,
    ['resetAllCount', 'getDepthAndCount', 'resetCount', 'setCount']
  );

  const mockedMetadataStorage = createSpyObj<ClassMetadataStorage>(
    ClassMetadataStorage,
    ['getMetadata']
  );

  class Bar {
    bar!: string;
    date!: Date;
  }

  class Foo {
    foo!: string;
    bar!: Bar;
  }

  const defaultDate = new Date('10/14/1991');
  const defaultFoo: Foo = new Foo();
  defaultFoo.foo = 'foo';
  defaultFoo.bar = new Bar();
  defaultFoo.bar.bar = 'bar';
  defaultFoo.bar.date = defaultDate;

  let parameterizedInstantiate: () => [Foo, unknown[]?];

  describe('without default value', () => {
    beforeEach(() => {
      parameterizedInstantiate = () =>
        instantiate(mockedInstanceStorage, mockedMetadataStorage, Foo);
    });

    afterEach(() => {
      resetAllWhenMocks();
    });

    it('should return raw instance if meta is empty', () => {
      mockEmpty();

      const result = parameterizedInstantiate();
      expect(result).toEqual([new Foo()]);
    });

    it('should return proper instance with metadata', () => {
      mockWithoutDepth();

      const fooInstance = new Foo();
      fooInstance.foo = '';
      fooInstance.bar = new Bar();

      const result = parameterizedInstantiate();
      expect(result).toEqual([
        { ...fooInstance, foo: undefined },
        [
          [['foo'], String],
          [['bar'], Bar],
        ],
      ]);
    });

    it('should return proper instance with depth', () => {
      mockWithDepth();

      const fooInstance = new Foo();
      fooInstance.foo = '';
      fooInstance.bar = new Bar();
      fooInstance.bar.bar = '';
      fooInstance.bar.date = defaultDate;

      const result = parameterizedInstantiate();
      result[0].bar.date = defaultDate;
      expect(result).toEqual([
        Object.assign(fooInstance, {
          foo: undefined,
          bar: Object.assign(fooInstance.bar, { bar: undefined }),
        }),
        [
          [['foo'], String],
          [['bar'], Bar],
        ],
      ]);
    });
  });

  describe('with default value', () => {
    beforeEach(() => {
      parameterizedInstantiate = () =>
        instantiate(
          mockedInstanceStorage,
          mockedMetadataStorage,
          Foo,
          defaultFoo
        );
    });

    afterEach(() => {
      resetAllWhenMocks();
    });

    it('should return raw instance if meta is empty', () => {
      mockEmpty();

      const result = parameterizedInstantiate();
      expect(result).toEqual([defaultFoo]);
    });

    it('should return proper instance with metadata', () => {
      mockWithoutDepth();

      const result = parameterizedInstantiate();
      expect(result).toEqual([
        defaultFoo,
        [
          [['foo'], String],
          [['bar'], Bar],
        ],
      ]);
    });

    it('should return proper instance with depth', () => {
      mockWithDepth();

      const result = parameterizedInstantiate();
      expect(result).toEqual([
        defaultFoo,
        [
          [['foo'], String],
          [['bar'], Bar],
        ],
      ]);
    });
  });

  const fooMatcher = when(((model) => model === Foo) as any);
  const barMatcher = when(((model) => model === Bar) as any);

  function mockEmpty() {
    when(mockedInstanceStorage.getDepthAndCount)
      .calledWith(fooMatcher as any, ['bar'])
      .mockReturnValueOnce([0, 0]);
    when(mockedMetadataStorage.getMetadata)
      .calledWith(fooMatcher as any)
      .mockReturnValueOnce([]);
  }

  function mockWithoutDepth() {
    when(mockedInstanceStorage.getDepthAndCount)
      .calledWith(fooMatcher as any, ['bar'])
      .mockReturnValueOnce([0, 0]);
    when(mockedMetadataStorage.getMetadata)
      .calledWith(fooMatcher as any)
      .mockReturnValueOnce([
        [['foo'], () => String],
        [['bar'], () => Bar],
      ]);
    when(mockedMetadataStorage.getMetadata)
      .calledWith(barMatcher as any)
      .mockReturnValueOnce([
        [['bar'], () => String],
        [['date'], () => Date],
      ]);
  }

  function mockWithDepth() {
    when(mockedInstanceStorage.getDepthAndCount)
      .calledWith(fooMatcher as any, ['bar'])
      .mockReturnValueOnce([1, 0]);
    when(mockedMetadataStorage.getMetadata)
      .calledWith(fooMatcher as any)
      .mockReturnValueOnce([
        [['foo'], () => String],
        [['bar'], () => Bar],
      ]);
    when(mockedMetadataStorage.getMetadata)
      .calledWith(barMatcher as any)
      .mockReturnValueOnce([
        [['bar'], () => String],
        [['date'], () => Date],
      ]);
  }
});
