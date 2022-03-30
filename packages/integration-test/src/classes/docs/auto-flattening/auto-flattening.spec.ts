import { classes } from '@automapper/classes';
import {
    CamelCaseNamingConvention,
    createMap,
    createMapper,
} from '@automapper/core';
import { Customer, Order, Product } from './order';
import { OrderDto } from './order.dto';

describe('Docs - Auto Flattening', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    it('should flatten correctly', () => {
        createMap(mapper, Order, OrderDto);

        const product = new Product(5, 'Fried Chicken');
        const customer = new Customer('Chau Tran');
        const order = new Order(customer);
        order.addItem(product, 10);

        const dto = mapper.map(order, Order, OrderDto);
        expect(dto.total).toEqual(50);
        expect(dto.customerName).toEqual('Chau Tran');
    });
});
