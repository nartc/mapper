import { AutoMap, classes } from '@automapper/classes';
import {createMap, createMapper} from '@automapper/core';

describe('Map - Self Reference', () => {
    class Foo {
        @AutoMap()
        foo!: string;

        @AutoMap(() => Foo)
        friend!: Foo;
        @AutoMap(() => Foo)
        ignore!: Foo;
    }

    class FooDto {
        @AutoMap()
        foo!: string;

        @AutoMap(() => FooDto)
        friend!: FooDto;
        @AutoMap(() => FooDto)
        ignore!: FooDto;
    }

    const mapper = createMapper({ strategyInitializer: classes() });

    createMap(mapper, Foo, FooDto);

    it('should map correctly', () => {
      const foo = new Foo();
      foo.foo = 'root';
      foo.friend = new Foo();
      foo.friend.foo = 'friend';
      foo.ignore = new Foo();
      foo.ignore.foo = 'ignore';

      const dto = mapper.map(foo, Foo, FooDto);
      expect(dto.foo).toEqual(foo.foo);
      expect(dto.friend.foo).toEqual(foo.friend.foo);
      expect(dto.ignore.foo).toEqual(foo.ignore.foo);
    });
});
