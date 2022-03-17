import { AutoMap } from '@automapper/classes';

export class FooFooFoo {
    @AutoMap()
    foo!: string;

    constructor(foo: string) {
        this.foo = foo;
    }
}

export class FooFoo {
    @AutoMap(() => FooFooFoo)
    foo!: FooFooFoo;
}

export class Foo {
    @AutoMap(() => FooFoo)
    foo!: FooFoo;
}

export class FooBarBazQux {
    @AutoMap()
    fooBarBazQux!: string;
}

export class FooBarBaz {
    @AutoMap(() => FooBarBazQux)
    fooBarBaz!: FooBarBazQux;
}

export class FooBar {
    @AutoMap(() => FooBarBaz)
    fooBar!: FooBarBaz;
}
