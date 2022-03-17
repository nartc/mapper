import { classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    forMember,
    forSelf,
    fromValue,
} from '@automapper/core';
import { CartItemDto } from './dtos/cart-item.dto';
import { CartItem, Item } from './models/cart-item';

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
        createMap(
            mapper,
            CartItem,
            CartItemDto,
            forSelf(Item, (src) => src.item)
        );

        const dto = mapper.map(cartItem, CartItem, CartItemDto);
        expect(dto.name).toEqual(item.name);
        expect(dto.price).toEqual(item.price);
        expect(dto.quantity).toEqual(cartItem.quantity);
        expect(dto.total).toEqual(cartItem.quantity * item.price);
    });

    it('should map with existing mapping forSelf', () => {
        const mapping = createMap(mapper, Item, CartItemDto);
        createMap(
            mapper,
            CartItem,
            CartItemDto,
            forSelf(mapping, (src) => src.item)
        );

        const dto = mapper.map(cartItem, CartItem, CartItemDto);
        expect(dto.name).toEqual(item.name);
        expect(dto.price).toEqual(item.price);
        expect(dto.quantity).toEqual(cartItem.quantity);
        expect(dto.total).toEqual(cartItem.quantity * item.price);
    });

    it('should respect mapping property by forMember', () => {
        createMap(
            mapper,
            CartItem,
            CartItemDto,
            forSelf(Item, (src) => src.item),
            forMember((d) => d.name, fromValue('override name'))
        );

        const dto = mapper.map(cartItem, CartItem, CartItemDto);
        expect(dto.name).toEqual('override name');
        expect(dto.price).toEqual(item.price);
        expect(dto.quantity).toEqual(cartItem.quantity);
        expect(dto.total).toEqual(cartItem.quantity * item.price);
    });

    it('should respect mapping property by forMember BEFORE forSelf', () => {
        createMap(
            mapper,
            CartItem,
            CartItemDto,
            forMember((d) => d.name, fromValue('override name')),
            forSelf(Item, (src) => src.item)
        );

        const dto = mapper.map(cartItem, CartItem, CartItemDto);
        expect(dto.name).toEqual('override name');
        expect(dto.price).toEqual(item.price);
        expect(dto.quantity).toEqual(cartItem.quantity);
        expect(dto.total).toEqual(cartItem.quantity * item.price);
    });
});
