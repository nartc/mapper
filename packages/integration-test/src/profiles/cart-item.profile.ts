import { createMap, forSelf, MappingProfile } from '@automapper/core';
import { CartItemDto } from '../dtos/cart-item.dto';
import { CartItem, Item } from '../models/cart-item';

export const cartItemProfile: MappingProfile = (mapper) => {
    createMap(
        mapper,
        CartItem,
        CartItemDto,
        forSelf(Item, (src) => src.item)
    );
};

export const cartItemWithMappingProfile: MappingProfile = (mapper) => {
    const mapping = createMap(mapper, Item, CartItemDto);
    createMap(
        mapper,
        CartItem,
        CartItemDto,
        forSelf(mapping, (src) => src.item)
    );
};
