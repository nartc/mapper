import { AutoMap } from '@automapper/classes';

export class OrderDto {
    @AutoMap()
    customerName!: string;
    @AutoMap()
    total!: number;
}
