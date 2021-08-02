import { AutoMap } from '@automapper/classes';

export class TypeConverterSource {
  @AutoMap()
  value1!: string;
  @AutoMap()
  value2!: string;
  @AutoMap()
  value3!: string;
}

export class TypeConverterDestination {
  @AutoMap()
  value1!: number;
  @AutoMap()
  value2!: Date;
  @AutoMap()
  value3!: boolean;
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
