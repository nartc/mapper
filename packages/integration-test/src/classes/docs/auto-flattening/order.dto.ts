import { AutoMap } from '@jersmart/automapper-classes';

export class OrderDto {
    @AutoMap()
    customerName!: string;
    @AutoMap()
    total!: number;
}
