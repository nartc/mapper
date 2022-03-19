import { AutoMap } from '@automapper/classes';
import { Foo, FooDto } from '../foo/foo';

export class FooExtend extends Foo {
    @AutoMap()
    fooFoo!: string;
}

export class FooExtendDto extends FooDto {
    @AutoMap()
    fooFoo!: string;
}
