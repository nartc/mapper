import { PojosMetadataMap } from '@automapper/pojos';

export interface FooFooFoo {
    foo: string;
}

export interface FooFoo {
    foo: FooFooFoo;
}

export interface Foo {
    foo: FooFoo;
}

export interface FooBarBazQux {
    fooBarBazQux: string;
}

export interface FooBarBaz {
    fooBarBaz: FooBarBazQux;
}

export interface FooBar {
    fooBar: FooBarBaz;
}

export function createDeepNestMetadata() {
    PojosMetadataMap.create<FooFooFoo>('FooFooFoo', {
        foo: String,
    });

    PojosMetadataMap.create<FooFoo>('FooFoo', {
        foo: 'FooFooFoo',
    });

    PojosMetadataMap.create<Foo>('Foo', {
        foo: 'FooFoo',
    });

    PojosMetadataMap.create<FooBarBazQux>('FooBarBazQux', {
        fooBarBazQux: String,
    });

    PojosMetadataMap.create<FooBarBaz>('FooBarBaz', {
        fooBarBaz: 'FooBarBazQux',
    });

    PojosMetadataMap.create<FooBar>('FooBar', {
        fooBar: 'FooBarBaz',
    });
}
