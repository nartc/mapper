import { AutoMap, classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    forMember,
    mapFrom,
    nullSubstitution,
} from '@automapper/core';

enum Enum {
    Value1 = 'Value1',
    Value2 = 'Value2',
}

class Model {
    @AutoMap()
    data!: string;
}

class ModelDto {
    @AutoMap()
    dataDto!: string;
}

class Foo {
    @AutoMap(() => [String])
    values!: Enum[];
    @AutoMap(() => Model)
    model!: Model;
    @AutoMap(() => [Model])
    models!: Model[];
}

class Bar {
    @AutoMap(() => [String])
    values!: Enum[];
    @AutoMap(() => ModelDto)
    model!: ModelDto;
    @AutoMap(() => [ModelDto])
    models!: ModelDto[];
}

describe('Issue 480', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    it('should map properly', () => {
        createMap(
            mapper,
            Model,
            ModelDto,
            forMember(
                (dto) => dto.dataDto,
                mapFrom((model) => model.data)
            )
        );
        createMap(
            mapper,
            Foo,
            Bar,
            forMember((bar) => bar.values, nullSubstitution([])),
            forMember((bar) => bar.model, nullSubstitution(new ModelDto())),
            forMember((bar) => bar.models, nullSubstitution([]))
        );

        const foo = new Foo();
        foo.values = [Enum.Value1];
        foo.model = new Model();
        foo.model.data = 'data';
        foo.models = [new Model()];
        foo.models[0].data = 'data in array';
        const bar = mapper.map(foo, Foo, Bar);
        expect(bar.values).toEqual([Enum.Value1]);
        expect(bar.model).toEqual({ dataDto: 'data' });
        expect(bar.models).toEqual([{ dataDto: 'data in array' }]);
    });
});
