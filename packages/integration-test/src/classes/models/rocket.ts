import { AutoMap } from '@automapper/classes';

export class Diameter {
    @AutoMap(() => Number)
    meters!: number | null;

    @AutoMap(() => Number)
    feet!: number | null;
}

export class ISP {
    @AutoMap()
    sea_level!: number;

    @AutoMap()
    vacuum!: number;
}

export class Thrust {
    @AutoMap()
    kN!: number;

    @AutoMap()
    lbf!: number;
}

export class LandingLegs {
    @AutoMap()
    number!: number;

    @AutoMap(() => String)
    material!: null | string;
}

export class Mass {
    @AutoMap()
    kg!: number;

    @AutoMap()
    lb!: number;
}

export class PayloadWeight {
    @AutoMap()
    id!: string;

    @AutoMap()
    name!: string;

    @AutoMap()
    kg!: number;

    @AutoMap()
    lb!: number;
}

export class Engines {
    @AutoMap()
    number!: number;

    @AutoMap()
    type!: string;

    @AutoMap()
    version!: string;

    @AutoMap(() => String)
    layout!: null | string;

    @AutoMap(() => ISP)
    isp!: ISP;

    @AutoMap(() => Number)
    engine_loss_max!: number | null;

    @AutoMap()
    propellant_1!: string;

    @AutoMap()
    propellant_2!: string;

    @AutoMap(() => Thrust)
    thrust_sea_level!: Thrust;

    @AutoMap(() => Thrust)
    thrust_vacuum!: Thrust;

    @AutoMap()
    thrust_to_weight!: number;
}

export class FirstStage {
    @AutoMap()
    reusable!: boolean;

    @AutoMap()
    engines!: number;

    @AutoMap()
    fuel_amount_tons!: number;

    @AutoMap(() => Number)
    burn_time_sec!: number | null;

    @AutoMap(() => Thrust)
    thrust_sea_level!: Thrust;

    @AutoMap(() => Thrust)
    thrust_vacuum!: Thrust;

    @AutoMap()
    cores?: number;
}

export class CompositeFairing {
    @AutoMap(() => Diameter)
    height!: Diameter;

    @AutoMap(() => Diameter)
    diameter!: Diameter;
}

export class Payloads {
    @AutoMap()
    option_1!: string;

    @AutoMap(() => CompositeFairing)
    composite_fairing!: CompositeFairing;

    @AutoMap()
    option_2?: string;
}

export class SecondStage {
    @AutoMap()
    reusable!: boolean;

    @AutoMap()
    engines!: number;

    @AutoMap()
    fuel_amount_tons!: number;

    @AutoMap(() => Number)
    burn_time_sec!: number | null;

    @AutoMap(() => Thrust)
    thrust!: Thrust;

    @AutoMap(() => Payloads)
    payloads!: Payloads;
}

export class Rocket {
    @AutoMap()
    id!: number;

    @AutoMap()
    active!: boolean;

    @AutoMap()
    stages!: number;

    @AutoMap()
    boosters!: number;

    @AutoMap()
    cost_per_launch!: number;

    @AutoMap()
    success_rate_pct!: number;

    @AutoMap()
    first_flight!: Date;

    @AutoMap()
    country!: string;

    @AutoMap()
    company!: string;

    @AutoMap(() => Diameter)
    height!: Diameter;

    @AutoMap(() => Diameter)
    diameter!: Diameter;

    @AutoMap(() => Mass)
    mass!: Mass;

    @AutoMap(() => [PayloadWeight])
    payload_weights!: PayloadWeight[];

    @AutoMap(() => FirstStage)
    first_stage!: FirstStage;

    @AutoMap(() => SecondStage)
    second_stage!: SecondStage;

    @AutoMap(() => Engines)
    engines!: Engines;

    @AutoMap(() => LandingLegs)
    landing_legs!: LandingLegs;

    @AutoMap(() => [String])
    flickr_images!: string[];

    @AutoMap()
    wikipedia!: string;

    @AutoMap()
    description!: string;

    @AutoMap()
    rocket_id!: string;

    @AutoMap()
    rocket_name!: string;

    @AutoMap()
    rocket_type!: string;
}
