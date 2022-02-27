import { AutoMap } from '@automapper/classes';

export class FooFooFoo {
  @AutoMap()
  foo: string;
}

export class FooFoo {
  @AutoMap({ typeFn: () => FooFooFoo })
  foo: FooFooFoo;
}

export class Foo {
  @AutoMap({ typeFn: () => FooFoo })
  foo: FooFoo;
}

export class FooFooFooDto {
  @AutoMap()
  foo: string;
}

export class FooFooDto {
  @AutoMap({ typeFn: () => FooFooFooDto })
  foo: FooFooFooDto;
}

export class FooDto {
  @AutoMap({ typeFn: () => FooFooDto })
  foo: FooFooDto;
}

export class FooBarBazQux {
  @AutoMap()
  fooBarBazQux: string;
}

export class FooBarBaz {
  @AutoMap({ typeFn: () => FooBarBazQux })
  fooBarBaz: FooBarBazQux;
}

export class FooBar {
  @AutoMap({ typeFn: () => FooBarBaz })
  fooBar: FooBarBaz;
}

export class FooBarBazQuxDto {
  @AutoMap()
  foo_bar_baz_qux: string;
}

export class FooBarBazDto {
  @AutoMap({ typeFn: () => FooBarBazQuxDto })
  foo_bar_baz: FooBarBazQuxDto;
}

export class FooBarDto {
  @AutoMap({ typeFn: () => FooBarBazDto })
  foo_bar: FooBarBazDto;
}
