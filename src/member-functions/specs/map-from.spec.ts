import { MemberMapFunctionId, Resolver, TransformationType } from '../../types';
import { mapFrom } from '../map-from';

describe('MapFromFunction', () => {
  const source = {
    foo: 'bar',
  };

  const sourceSelector = (s: typeof source) => s.foo;

  it('should return correctly', () => {
    const mapFromFn = mapFrom(sourceSelector);
    expect(mapFromFn).toBeTruthy();
    expect(mapFromFn[MemberMapFunctionId.type]).toBe(
      TransformationType.MapFrom
    );
    expect(mapFromFn[MemberMapFunctionId.misc]).toBe(sourceSelector);
    expect(mapFromFn[MemberMapFunctionId.fn]).toBeInstanceOf(Function);
  });

  it('should map to foo correctly', () => {
    const mapFromFn = mapFrom(sourceSelector);
    const result = mapFromFn[MemberMapFunctionId.fn](source, null);
    expect(result).toBe('bar');
  });

  class FooResolver implements Resolver<typeof source, any> {
    resolve(source: any) {
      return source.foo;
    }
  }

  it('should use resolver correctly', () => {
    const mapFromFn = mapFrom(new FooResolver());
    const result = mapFromFn[MemberMapFunctionId.fn](source, null);
    expect(result).toBe('bar');
  });
});
