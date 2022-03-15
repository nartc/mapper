import { AutoMap } from '@automapper/classes';

export class FooFooFooDto {
    @AutoMap()
    foo!: string;
}

export class FooFooDto {
    @AutoMap(() => FooFooFooDto)
    foo!: FooFooFooDto;
}

export class FooDto {
    @AutoMap(() => FooFooDto)
    foo!: FooFooDto;
}

export class FooBarBazQuxDto {
    @AutoMap()
    foo_bar_baz_qux!: string;
}

export class FooBarBazDto {
    @AutoMap(() => FooBarBazQuxDto)
    foo_bar_baz!: FooBarBazQuxDto;
}

export class FooBarDto {
    @AutoMap(() => FooBarBazDto)
    foo_bar!: FooBarBazDto;
}
