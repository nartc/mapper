import { PojosMetadataMap } from '@automapper/pojos';

export interface FooFooFooDto {
    foo: string;
}

export interface FooFooDto {
    foo: FooFooFooDto;
}

export interface FooDto {
    foo: FooFooDto;
}

export interface FooBarBazQuxDto {
    foo_bar_baz_qux: string;
}

export interface FooBarBazDto {
    foo_bar_baz: FooBarBazQuxDto;
}

export interface FooBarDto {
    foo_bar: FooBarBazDto;
}

export function createDeepNestDtoMetadata() {
    PojosMetadataMap.create<FooFooFooDto>('FooFooFooDto', {
        foo: String,
    });

    PojosMetadataMap.create<FooFooDto>('FooFooDto', {
        foo: 'FooFooFooDto',
    });

    PojosMetadataMap.create<FooDto>('FooDto', {
        foo: 'FooFooDto',
    });

    PojosMetadataMap.create<FooBarBazQuxDto>('FooBarBazQuxDto', {
        foo_bar_baz_qux: String,
    });

    PojosMetadataMap.create<FooBarBazDto>('FooBarBazDto', {
        foo_bar_baz: 'FooBarBazQuxDto',
    });

    PojosMetadataMap.create<FooBarDto>('FooBarDto', {
        foo_bar: 'FooBarBazDto',
    });
}
