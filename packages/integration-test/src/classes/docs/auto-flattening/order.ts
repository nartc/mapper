import { AutoMap } from '@automapper/classes';

export class Product {
    @AutoMap()
    price!: number;
    @AutoMap()
    name!: string;

    constructor(price: number, name: string) {
        this.price = price;
        this.name = name;
    }
}

export class Customer {
    @AutoMap()
    name!: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class OrderItem {
    @AutoMap(() => Product)
    product!: Product;
    @AutoMap()
    quantity!: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }

    get total() {
        return this.product.price * this.quantity;
    }
}

export class Order {
    @AutoMap(() => [OrderItem])
    items: OrderItem[] = [];
    @AutoMap(() => Customer)
    customer!: Customer;

    @AutoMap()
    get total(): number {
        return this.items.reduce((sum, item) => sum + item.total, 0);
    }

    constructor(customer: Customer) {
        this.customer = customer;
    }

    addItem(product: Product, quantity: number) {
        this.items.push(new OrderItem(product, quantity));
    }
}
