import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
    forMember,
    forSelf,
    fromValue,
    mapFrom,
} from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { CartItemDto } from '../classes/dtos/cart-item.dto';
import { createCartItemDtoMetadata } from './dtos/cart-item.dto';
import { CartItem, createCartItemMetadata, Item } from './models/cart-item';

describe('Map - ForSelf', () => {
    const mapper = createMapper({
        strategyInitializer: pojos(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    const item: Item = { stock: 456, price: 123, name: 'item1' };
    const cartItem: CartItem = {
        item,
        quantity: 10,
    };

    beforeEach(() => {
        createCartItemMetadata();
        createCartItemDtoMetadata();
    });

    afterEach(() => {
        mapper.dispose();
        PojosMetadataMap.reset();
    });

    it('should map with SourceIdentifier', () => {
        createMap<CartItem, CartItemDto>(
            mapper,
            'CartItem',
            'CartItemDto',
            forSelf('Item', (src) => src.item),
            forMember(
                (d) => d.total,
                mapFrom((s) => s.item.price * s.quantity)
            )
        );

        const dto = mapper.map<CartItem, CartItemDto>(
            cartItem,
            'CartItem',
            'CartItemDto'
        );
        expect(dto.name).toEqual(item.name);
        expect(dto.price).toEqual(item.price);
        expect(dto.quantity).toEqual(cartItem.quantity);
        expect(dto.total).toEqual(cartItem.quantity * item.price);
    });

    it('should map with existing mapping forSelf', () => {
        const mapping = createMap<Item, CartItemDto>(
            mapper,
            'Item',
            'CartItemDto'
        );
        createMap<CartItem, CartItemDto>(
            mapper,
            'CartItem',
            'CartItemDto',
            forSelf(mapping, (src) => src.item),
            forMember(
                (d) => d.total,
                mapFrom((s) => s.item.price * s.quantity)
            )
        );

        const dto = mapper.map<CartItem, CartItemDto>(
            cartItem,
            'CartItem',
            'CartItemDto'
        );
        expect(dto.name).toEqual(item.name);
        expect(dto.price).toEqual(item.price);
        expect(dto.quantity).toEqual(cartItem.quantity);
        expect(dto.total).toEqual(cartItem.quantity * item.price);
    });

    it('should respect mapping property by forMember', () => {
        createMap<CartItem, CartItemDto>(
            mapper,
            'CartItem',
            'CartItemDto',
            forSelf('Item', (src) => src.item),
            forMember((d) => d.name, fromValue('override name')),
            forMember(
                (d) => d.total,
                mapFrom((s) => s.item.price * s.quantity)
            )
        );

        const dto = mapper.map<CartItem, CartItemDto>(
            cartItem,
            'CartItem',
            'CartItemDto'
        );
        expect(dto.name).toEqual('override name');
        expect(dto.price).toEqual(item.price);
        expect(dto.quantity).toEqual(cartItem.quantity);
        expect(dto.total).toEqual(cartItem.quantity * item.price);
    });

    it('should respect mapping property by forMember BEFORE forSelf', () => {
        createMap<CartItem, CartItemDto>(
            mapper,
            'CartItem',
            'CartItemDto',
            forMember((d) => d.name, fromValue('override name')),
            forSelf('Item', (src) => src.item),
            forMember(
                (d) => d.total,
                mapFrom((s) => s.item.price * s.quantity)
            )
        );

        const dto = mapper.map<CartItem, CartItemDto>(
            cartItem,
            'CartItem',
            'CartItemDto'
        );
        expect(dto.name).toEqual('override name');
        expect(dto.price).toEqual(item.price);
        expect(dto.quantity).toEqual(cartItem.quantity);
        expect(dto.total).toEqual(cartItem.quantity * item.price);
    });
});
