export class Bar {
  bar!: string;
}

export class Foo {
  foo!: string;
  bar!: Bar;
}

export class BarVm {
  barVm!: string;
}

export class FooVm {
  fooVm!: string;
  barVm!: BarVm;
}
