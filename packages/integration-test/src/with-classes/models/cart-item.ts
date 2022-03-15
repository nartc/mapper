import { AutoMap } from '@automapper/classes';

export class Item {
    @AutoMap()
    name!: string;
    @AutoMap()
    price!: number;
    @AutoMap()
    stock!: number;
}

export class CartItem {
    @AutoMap(() => Item)
    item!: Item;
    @AutoMap()
    quantity!: number;
}
