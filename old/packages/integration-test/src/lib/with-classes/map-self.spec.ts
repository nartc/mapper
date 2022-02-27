import { AutoMap } from '@automapper/classes';
import { setupClasses } from '../setup.spec';
import { fromValue } from '@automapper/core';

describe('Map - Self', () => {
  class Item {
    @AutoMap()
    name: string;
    @AutoMap()
    price: number;
    @AutoMap()
    stock: number;
  }

  class CartItem {
    @AutoMap({ typeFn: () => Item })
    item: Item;
    @AutoMap()
    quantity: number;
  }

  class CartItemDto {
    @AutoMap()
    name: string;
    @AutoMap()
    price: number;
    @AutoMap()
    quantity: number;

    get total() {
      return this.price * this.quantity;
    }
  }

  const [mapper] = setupClasses('selfMapping');

  afterEach(() => {
    mapper.dispose();
  });

  it('should map correctly', () => {
    mapper.createMap(Item, CartItemDto);
    mapper.createMap(CartItem, CartItemDto).forSelf(Item, (src) => src.item);

    const item = new Item();
    item.name = 'item1';
    item.price = 123;
    item.stock = 456;
    const cartItem = new CartItem();
    cartItem.item = item;
    cartItem.quantity = 10;

    const dto = mapper.map(cartItem, CartItemDto, CartItem);
    expect(dto.name).toEqual(item.name);
    expect(dto.price).toEqual(item.price);
    expect(dto.quantity).toEqual(cartItem.quantity);
    expect(dto.total).toEqual(cartItem.quantity * item.price);
    expect(dto['stock']).toBeUndefined();
  });

  it('should map correctly for forMember that overrides forSelf', () => {
    mapper.createMap(Item, CartItemDto);
    mapper
      .createMap(CartItem, CartItemDto)
      .forSelf(Item, (src) => src.item)
      .forMember((d) => d.name, fromValue('override name'));

    const item = new Item();
    item.name = 'item1';
    item.price = 123;
    const cartItem = new CartItem();
    cartItem.item = item;
    cartItem.quantity = 10;

    const dto = mapper.map(cartItem, CartItemDto, CartItem);
    expect(dto.name).toEqual('override name');
    expect(dto.price).toEqual(item.price);
    expect(dto.quantity).toEqual(cartItem.quantity);
    expect(dto.total).toEqual(cartItem.quantity * item.price);
    expect(dto['stock']).toBeUndefined();
  });

  it('should map correctly for forMember that overrides BEFORE forSelf', () => {
    mapper.createMap(Item, CartItemDto);
    mapper
      .createMap(CartItem, CartItemDto)
      .forMember((d) => d.name, fromValue('override before name'))
      .forSelf(Item, (src) => src.item);

    const item = new Item();
    item.name = 'item1';
    item.price = 123;
    const cartItem = new CartItem();
    cartItem.item = item;
    cartItem.quantity = 10;

    const dto = mapper.map(cartItem, CartItemDto, CartItem);
    expect(dto.name).toEqual('override before name');
    expect(dto.price).toEqual(item.price);
    expect(dto.quantity).toEqual(cartItem.quantity);
    expect(dto.total).toEqual(cartItem.quantity * item.price);
    expect(dto['stock']).toBeUndefined();
  });
});
