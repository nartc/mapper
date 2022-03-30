import { PojosMetadataMap } from '@automapper/pojos';

export interface CartItemDto {
    name: string;
    price: number;
    quantity: number;
    total: number;
}

export function createCartItemDtoMetadata() {
    PojosMetadataMap.create<CartItemDto>('CartItemDto', {
        name: String,
        price: Number,
        quantity: Number,
        total: Number,
    });
}
