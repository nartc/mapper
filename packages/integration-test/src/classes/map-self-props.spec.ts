import { AutoMap, classes } from '@automapper/classes';
import {
    afterMap,
    CamelCaseNamingConvention,
    constructUsing,
    createMap,
    createMapper,
    forSelf,
    Mapper,
    Mapping,
    ModelIdentifier,
} from '@automapper/core';
type Relation<T> = T;

class Item {
    name!: string;
    price!: number;
    stock!: number;
    @AutoMap(() => Environment)
    environment!: Relation<Environment>;
    @AutoMap(() => Item)
    parentItem!: Relation<Item>;
    @AutoMap(() => [Item])
    children!: Relation<Item>[];
}

class ItemPropsDto {
    name!: string;
    price!: number;
    stock!: number;
    @AutoMap(() => EnvironmentEntity)
    environment!: Relation<EnvironmentEntity>;
    @AutoMap(() => ItemEntity)
    parentItem!: Relation<ItemEntity>;
    @AutoMap(() => [ItemEntity])
    children!: Relation<ItemEntity>[];
}

class ItemEntity {
    protected readonly props: ItemPropsDto;
    constructor(props: ItemPropsDto) {
        this.props = props;
    }
    get name(): string {
        return this.props.name;
    }

    set name(value: string) {
        this.props.name = value;
    }
    get price(): number {
        return this.props.price;
    }
    get stock(): number {
        return this.props.stock;
    }

    get parentItem(): Relation<ItemEntity> {
        return this.props.parentItem;
    }

    set parentItem(value: Relation<ItemEntity>) {
        this.props.parentItem = value;
        if (value && value.children) {
            if (!this.props.parentItem.children.includes(this)) {
                this.props.parentItem.children.push(this);
            }
        }
    }

    get children(): Relation<ItemEntity>[] {
        return this.props.children;
    }

    set children(value: Relation<ItemEntity>[]) {
        this.props.children = value;
        if (value) {
            this.props.children.forEach((child) => {
                child.parentItem = this;
            });
        }
    }

    get environment(): Relation<EnvironmentEntity> {
        return this.props.environment;
    }

    get parentIndex(): number {
        if (this.parentItem) {
            return this.environment.items.indexOf(this.parentItem);
        }
        return -1;
    }
}

class Environment {
    envName!: string;
    region!: string;
    @AutoMap(() => [Item])
    items!: Relation<Item>[];
}

class EnvironmentDto {
    envName!: string;
    region!: string;
    @AutoMap(() => [ItemEntity])
    items!: Relation<ItemEntity>[];
}

class EnvironmentEntity {
    constructor(protected props: EnvironmentDto) {}
    get envName(): string {
        return 'Environment:' + this.props.envName;
    }
    get region(): string {
        return this.props.region;
    }

    get items(): ItemEntity[] {
        return this.props.items;
    }

    get itemsAmount(): number {
        return this.props.items.length || 0;
    }
}

type Type<T = any> = new (...args: any[]) => T;
export function createEntityMap<
    E extends Type,
    P extends Type,
    D extends Type,
    SI extends ModelIdentifier = ModelIdentifier<E>,
    DI extends ModelIdentifier = ModelIdentifier<D>,
    PI extends ModelIdentifier = ModelIdentifier<P>
>(
    mapper: Mapper,
    sourceIdentifier: SI,
    destinationIdentifier: DI,
    propsIdentifier: PI,
    EntityClass: E,
    PersistenceClass: P,
    DtoClass: D
): Mapping {
    const IS_MAPPING = Symbol('is_mapping');
    const propsMapping = createMap(mapper, sourceIdentifier, propsIdentifier);
    return createMap(
        mapper,
        sourceIdentifier,
        destinationIdentifier,
        forSelf(propsMapping, (source) => source),
        constructUsing((source: InstanceType<typeof PersistenceClass>, id) => {
            const props = new DtoClass();
            Object.assign(props, source);
            function hasSetter<T extends object>(
                target: T,
                prop: PropertyKey
            ): boolean {
                let current: T = target;

                while (current) {
                    const descriptor = Object.getOwnPropertyDescriptor(
                        current,
                        prop
                    );
                    if (descriptor) {
                        return typeof descriptor.set === 'function';
                    }
                    current = Object.getPrototypeOf(current);
                }

                return false;
            }
            const instance = new EntityClass(props, source.id);
            Reflect.set(instance, IS_MAPPING, true);

            const mapped = new Proxy<InstanceType<typeof EntityClass>>(
                instance,
                {
                    set(target, p, newValue) {
                        const isMapping = Reflect.get(instance, IS_MAPPING);
                        if (p === IS_MAPPING && !newValue) {
                            return Reflect.deleteProperty(target, p);
                        }
                        if (!isMapping) {
                            // Check if property has a setter, otherwise skip
                            return Reflect.set(target, p, newValue);
                        } else {
                            if (hasSetter(target, p)) {
                                return Reflect.set(target, p, newValue);
                            }
                            return Reflect.set(props, p, newValue);
                        }
                    },
                }
            );

            return mapped;
        }),
        afterMap((_, dest) => {
            Reflect.set(dest, IS_MAPPING, false);
        })
    );
}

describe('Map - ForSelf', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    const item = new Item();
    item.name = 'item1';
    item.price = 123;
    item.stock = 456;
    const environment = new Environment();
    environment.envName = 'production';
    environment.region = 'us-east-1';
    environment.items = [item];
    item.environment = environment;
    const otherItem = new Item();
    otherItem.name = 'item2';
    otherItem.price = 789;
    otherItem.stock = 1011;
    otherItem.environment = environment;
    item.parentItem = item;
    item.children = [otherItem];
    environment.items.push(otherItem);

    afterEach(() => {
        mapper.dispose();
    });

    it('should map with SourceIdentifier', async () => {
        createEntityMap(
            mapper,
            Environment,
            EnvironmentEntity,
            EnvironmentDto,
            EnvironmentEntity,
            Environment,
            EnvironmentDto
        );

        createEntityMap(
            mapper,
            Item,
            ItemEntity,
            ItemPropsDto,
            ItemEntity,
            Item,
            ItemPropsDto
        );

        const entity = mapper.map(item, Item, ItemEntity);

        entity.name = 'updated name';
        expect(entity.name).toBe('updated name');
        expect(entity.children[0].parentItem.name).toBe(entity.name);
        expect(entity.children[0].name).toBe('item2');
        console.log(entity.children[0].parentItem);
        expect(entity.environment.items[0].environment.items[0]).toBe(entity);
    });
});
