export class Bar {
    bar!: string;
}

export class Foo {
    foo!: string;
    bar!: Bar;
}

export class BarDto {
    barDto!: string;
}

export class FooDto {
    fooDto!: string;
    barDto!: BarDto;
}
