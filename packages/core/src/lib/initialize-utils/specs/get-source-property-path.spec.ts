import {
  CamelCaseNamingConvention,
  PascalCaseNamingConvention,
} from '../../naming-conventions';
import { getSourcePropertyPath } from '../get-source-property-path.util';

describe('getSourcePropertyPath', () => {
  const camelPascalNamingConventions = [
    new CamelCaseNamingConvention(),
    new PascalCaseNamingConvention(),
  ] as const;

  it('should return path as-is if namingConventions are not provided', () => {
    const sourcePath = getSourcePropertyPath('foo.bar');
    expect(sourcePath).toEqual('foo.bar');
  });

  it('should return path with namingConventions', () => {
    let sourcePath = getSourcePropertyPath(
      'Foo.Bar',
      camelPascalNamingConventions
    );
    expect(sourcePath).toEqual('foo.bar');

    sourcePath = getSourcePropertyPath(
      'FooBarBaz',
      camelPascalNamingConventions
    );
    expect(sourcePath).toEqual('fooBarBaz');
  });
});
