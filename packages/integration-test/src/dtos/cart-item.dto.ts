import { AutoMap } from '@automapper/classes';

export class CartItemDto {
    @AutoMap()
    name!: string;
    @AutoMap()
    price!: number;
    @AutoMap()
    quantity!: number;

    get total() {
        return this.price * this.quantity;
    }
}
