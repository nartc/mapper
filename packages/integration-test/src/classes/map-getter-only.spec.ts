import { AutoMap, classes } from '@automapper/classes';
import { createMap, createMapper } from '@automapper/core';

describe('Map - Getter Only', () => {
    class Foo {
        @AutoMap()
        get foo(): string {
            return 'getter only';
        }
    }

    class FooDto {
        @AutoMap()
        foo!: string;
    }

    const mapper = createMapper({ strategyInitializer: classes() });

    beforeEach(() => {
        createMap(mapper, Foo, FooDto);
        createMap(mapper, FooDto, Foo);
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should map correctly for Foo as Source', () => {
        const dto = mapper.map(new Foo(), Foo, FooDto);
        expect(dto.foo).toEqual('getter only');
    });

    it('should map correctly for Foo as Destination', () => {
        const dto = new FooDto();
        dto.foo = 'from dto';

        const foo = mapper.map(dto, FooDto, Foo);
        expect(foo.foo).toEqual('getter only');
    });
});
