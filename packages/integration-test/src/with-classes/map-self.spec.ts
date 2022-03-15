import { classes } from '@automapper/classes';
import {
    addProfile,
    CamelCaseNamingConvention,
    createMapper,
} from '@automapper/core';
import { CartItemDto } from '../dtos/cart-item.dto';
import { CartItem, Item } from '../models/cart-item';
import {
    cartItemProfile,
    cartItemWithMappingProfile,
} from '../profiles/cart-item.profile';

describe('Map - ForSelf', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    const item = new Item();
    item.name = 'item1';
    item.price = 123;
    item.stock = 456;
    const cartItem = new CartItem();
    cartItem.item = item;
    cartItem.quantity = 10;

    afterEach(() => {
        mapper.dispose();
    });

    it('should map with SourceIdentifier', () => {
        addProfile(mapper, cartItemProfile);

        const dto = mapper.map(cartItem, CartItem, CartItemDto);
        expect(dto.name).toEqual(item.name);
        expect(dto.price).toEqual(item.price);
        expect(dto.quantity).toEqual(cartItem.quantity);
        expect(dto.total).toEqual(cartItem.quantity * item.price);
    });

    it('should map with existing mapping forSelf', () => {
        addProfile(mapper, cartItemWithMappingProfile);

        const dto = mapper.map(cartItem, CartItem, CartItemDto);
        expect(dto.name).toEqual(item.name);
        expect(dto.price).toEqual(item.price);
        expect(dto.quantity).toEqual(cartItem.quantity);
        expect(dto.total).toEqual(cartItem.quantity * item.price);
    });
});
