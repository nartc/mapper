import { PojosMetadataMap } from '@automapper/pojos';

export interface Item {
    name: string;
    price: number;
    stock: number;
}

export interface CartItem {
    item: Item;
    quantity: number;
}

export function createCartItemMetadata() {
    PojosMetadataMap.create<Item>('Item', {
        name: String,
        stock: Number,
        price: Number,
    });

    PojosMetadataMap.create<CartItem>('CartItem', {
        item: 'Item',
        quantity: Number,
    });
}
