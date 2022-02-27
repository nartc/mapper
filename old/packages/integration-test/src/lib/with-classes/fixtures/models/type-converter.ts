import { AutoMap } from '@automapper/classes';

export class DateString extends Date {}

export class TimestampString extends Date {}

export class TypeConverterSource {
  @AutoMap()
  value1!: string;
  @AutoMap()
  value2!: string;
  @AutoMap()
  value3!: string;
  @AutoMap({ typeFn: () => DateString })
  value4!: Date;
  @AutoMap({ typeFn: () => TimestampString })
  value5!: Date;
}

export class TypeConverterDestination {
  @AutoMap()
  value1!: number;
  @AutoMap()
  value2!: Date;
  @AutoMap()
  value3!: boolean;
  @AutoMap()
  value4!: string;
  @AutoMap()
  value5!: string;
}

export class TypeConverterCamelSource {
  @AutoMap()
  valueOne!: string;
  @AutoMap()
  valueTwo!: string;
}

export class TypeConverterSnakeDestination {
  @AutoMap()
  value_one!: number;
  @AutoMap()
  value_two!: Date;
}

export class TypeConverterPascalDestination {
  @AutoMap()
  ValueOne!: number;
  @AutoMap()
  ValueTwo!: Date;
}
