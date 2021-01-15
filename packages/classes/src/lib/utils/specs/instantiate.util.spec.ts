// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  createSpyObject,
  resetAllWhenMocks,
  when,
} from '@automapper/test-util';
import { ClassInstanceStorage, ClassMetadataStorage } from '../../storages';
import { instantiate } from '../instantiate.util';

describe('instantiate', () => {
  const mockedInstanceStorage = createSpyObject(ClassInstanceStorage, {
    resetAllCount: jest.fn(),
    getDepthAndCount: jest.fn(),
    resetCount: jest.fn(),
    setCount: jest.fn(),
  });

  const mockedMetadataStorage = createSpyObject(ClassMetadataStorage, {
    getMetadata: jest.fn(),
  });

  class Bar {
    bar: string;
    date: Date;
  }

  class Foo {
    foo: string;
    bar: Bar;
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
      fooInstance.foo = undefined;
      fooInstance.bar = new Bar();

      const result = parameterizedInstantiate();
      expect(result).toEqual([fooInstance, [['bar', Bar]]]);
    });

    it('should return proper instance with depth', () => {
      mockWithDepth();

      const fooInstance = new Foo();
      fooInstance.foo = undefined;
      fooInstance.bar = new Bar();
      fooInstance.bar.bar = undefined;
      fooInstance.bar.date = defaultDate;

      const result = parameterizedInstantiate();
      result[0].bar.date = defaultDate;
      expect(result).toEqual([fooInstance, [['bar', Bar]]]);
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
      expect(result).toEqual([defaultFoo, [['bar', Bar]]]);
    });

    it('should return proper instance with depth', () => {
      mockWithDepth();

      const result = parameterizedInstantiate();
      expect(result).toEqual([defaultFoo, [['bar', Bar]]]);
    });
  });

  function mockEmpty() {
    when(mockedInstanceStorage.getDepthAndCount)
      .calledWith(Foo, 'bar')
      .mockReturnValueOnce([0, 0]);
    when(mockedMetadataStorage.getMetadata)
      .calledWith(Foo)
      .mockReturnValueOnce([]);
  }

  function mockWithoutDepth() {
    when(mockedInstanceStorage.getDepthAndCount)
      .calledWith(Foo, 'bar')
      .mockReturnValueOnce([0, 0]);
    when(mockedMetadataStorage.getMetadata)
      .calledWith(Foo)
      .mockReturnValueOnce([
        ['foo', () => String],
        ['bar', () => Bar],
      ]);
    when(mockedMetadataStorage.getMetadata)
      .calledWith(Bar)
      .mockReturnValueOnce([
        ['bar', () => String],
        ['date', () => Date],
      ]);
  }

  function mockWithDepth() {
    when(mockedInstanceStorage.getDepthAndCount)
      .calledWith(Foo, 'bar')
      .mockReturnValueOnce([1, 0]);
    when(mockedMetadataStorage.getMetadata)
      .calledWith(Foo)
      .mockReturnValueOnce([
        ['foo', () => String],
        ['bar', () => Bar],
      ]);
    when(mockedMetadataStorage.getMetadata)
      .calledWith(Bar)
      .mockReturnValueOnce([
        ['bar', () => String],
        ['date', () => Date],
      ]);
  }
});
