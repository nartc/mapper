import { AutoMap } from '@automapper/classes';

export class DateString extends Date {}

export class TimestampString extends Date {}

export class TypeConverter {
    @AutoMap()
    value1!: string;
    @AutoMap()
    value2!: string;
    @AutoMap()
    value3!: string;
    @AutoMap(() => [String])
    stringValues: string[] = [];
    @AutoMap(() => DateString)
    value4!: Date;
    @AutoMap(() => TimestampString)
    value5!: Date;
}
