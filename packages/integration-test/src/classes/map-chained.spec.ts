import { AutoMap, classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    constructUsing,
    createMap,
    createMapper,
    forMember,
    mapFrom,
} from '@automapper/core';

describe('Map - Chained Mapping', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    class A {
        @AutoMap()
        a!: string;
    }

    class B {
        @AutoMap()
        b!: string;
    }

    class C {
        @AutoMap()
        c!: string;
        extraC!: string;
    }

    it('should chained mappings', () => {
        createMap(
            mapper,
            A,
            B,
            forMember(
                (d) => d.b,
                mapFrom((s) => s.a + '!!!')
            )
        );
        createMap(
            mapper,
            B,
            C,
            forMember(
                (d) => d.c,
                mapFrom((s) => s.b + '!!!')
            )
        );
        createMap(
            mapper,
            A,
            C,
            constructUsing((sourceObject) => {
                const intermediate = mapper.map(sourceObject, A, B);
                return mapper.map(intermediate, B, C);
            }),
            forMember(
                (d) => d.extraC,
                mapFrom((s) => s.a + ' extra!!')
            )
        );

        const a = new A();
        a.a = 'value';

        const c = mapper.map(a, A, C);
        console.log(c);
        expect(c.c).toEqual('value!!!!!!');
        expect(c.extraC).toEqual('value extra!!');
    });
});
