import { AutoMap } from '@automapper/classes';

export class TypeConverterDto {
    @AutoMap()
    value1!: number;
    @AutoMap()
    value2!: Date;
    @AutoMap()
    value3!: boolean;
    @AutoMap(() => [Number])
    stringValues: number[] = [];
    @AutoMap()
    value4!: string;
    @AutoMap()
    value5!: string;
}
