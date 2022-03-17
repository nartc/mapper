import { AutoMap } from '@automapper/classes';

export class Address {
    @AutoMap()
    street!: string;
    @AutoMap()
    city!: string;
    @AutoMap()
    state!: string;
}

export class PascalAddress {
    @AutoMap()
    Street!: string;
    @AutoMap()
    City!: string;
    @AutoMap()
    State!: string;
}

export class SnakeAddress {
    @AutoMap()
    street!: string;
    @AutoMap()
    city!: string;
    @AutoMap()
    state!: string;
}
