import { AutoMap, classes } from '@automapper/classes';
import { constructUsing, createMap, createMapper } from '@automapper/core';

enum VehicleType {
    car = 'car',
    bus = 'bus',
}

class VehicleDto {
    @AutoMap()
    name!: string;

    @AutoMap(() => String)
    type!: VehicleType;
}

abstract class Vehicle {
    protected constructor(public name: string, public type: VehicleType) {}

    static create(name: string, type: VehicleType): Vehicle {
        return type === VehicleType.bus ? new Bus(name) : new Car(name);
    }
}

class Car extends Vehicle {
    constructor(name: string) {
        super(name, VehicleType.car);
    }
}

class Bus extends Vehicle {
    constructor(name: string) {
        super(name, VehicleType.bus);
    }
}

describe('Issue 614', () => {
    it('should allow constructUsing to return a concrete subtype for an abstract destination', () => {
        const mapper = createMapper({ strategyInitializer: classes() });
        createMap(
            mapper,
            VehicleDto,
            Vehicle,
            constructUsing((source) => Vehicle.create(source.name, source.type))
        );

        const source = new VehicleDto();
        source.name = 'City bus';
        source.type = VehicleType.bus;

        const destination = mapper.map(source, VehicleDto, Vehicle);

        expect(destination).toBeInstanceOf(Bus);
        expect(destination.name).toEqual('City bus');
    });
});
