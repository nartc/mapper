import { setupClasses } from '../setup.spec';
import {
  ExternalEnum1,
  ExternalStringEnum1,
} from './fixtures/models/enums/simple-with-enum.enum';
import {
  FooWithEnum,
  FooWithEnumDto,
} from './fixtures/models/simple-with-enum';

describe('With Enum', () => {
  const [mapper] = setupClasses('withEnum');

  enum StringEnum1 {
    Foo = 'foo',
    Bar = 'bar',
  }

  it('should map correctly', () => {
    mapper.createMap(FooWithEnum, FooWithEnumDto);

    const foo = new FooWithEnum();
    foo.externalEnum1 = ExternalEnum1.Bar;
    foo.externalStringEnum1 = ExternalStringEnum1.Foo;
    foo.enum1 = 0;
    foo.stringEnum1 = 'bar' as StringEnum1;

    const vm = mapper.map(foo, FooWithEnumDto, FooWithEnum);
    expect(vm).toBeTruthy();
  });
});
