import { AutoMap } from '@automapper/classes';
import {
  ExternalEnum1,
  ExternalStringEnum1,
} from './enums/simple-with-enum.enum';

enum Enum1 {
  Foo,
  Bar,
}

enum StringEnum1 {
  Foo = 'foo',
  Bar = 'bar',
}

export class FooWithEnum {
  @AutoMap()
  enum1!: Enum1;
  @AutoMap()
  stringEnum1!: StringEnum1;
  @AutoMap()
  externalEnum1!: ExternalEnum1;
  @AutoMap()
  externalStringEnum1!: ExternalStringEnum1;
}

export class FooWithEnumDto {
  @AutoMap()
  enum1!: Enum1;
  @AutoMap()
  stringEnum1!: StringEnum1;
  @AutoMap()
  externalEnum1!: ExternalEnum1;
  @AutoMap()
  externalStringEnum1!: ExternalStringEnum1;
}
