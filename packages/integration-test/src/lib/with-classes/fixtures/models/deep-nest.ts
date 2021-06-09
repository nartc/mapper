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
