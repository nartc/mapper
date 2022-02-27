import { AutoMap } from '@automapper/classes';

export class Diameter {
  @AutoMap({ typeFn: () => Number })
  meters!: number | null;

  @AutoMap({ typeFn: () => Number })
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

  @AutoMap()
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

  @AutoMap()
  layout!: null | string;

  @AutoMap({ typeFn: () => ISP })
  isp!: ISP;

  @AutoMap({ typeFn: () => Number })
  engine_loss_max!: number | null;

  @AutoMap()
  propellant_1!: string;

  @AutoMap()
  propellant_2!: string;

  @AutoMap({ typeFn: () => Thrust })
  thrust_sea_level!: Thrust;

  @AutoMap({ typeFn: () => Thrust })
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

  @AutoMap({ typeFn: () => Number })
  burn_time_sec!: number | null;

  @AutoMap({ typeFn: () => Thrust })
  thrust_sea_level!: Thrust;

  @AutoMap({ typeFn: () => Thrust })
  thrust_vacuum!: Thrust;

  @AutoMap()
  cores?: number;
}

export class CompositeFairing {
  @AutoMap({ typeFn: () => Diameter })
  height!: Diameter;

  @AutoMap({ typeFn: () => Diameter })
  diameter!: Diameter;
}

export class Payloads {
  @AutoMap()
  option_1!: string;

  @AutoMap({ typeFn: () => CompositeFairing })
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

  @AutoMap({ typeFn: () => Number })
  burn_time_sec!: number | null;

  @AutoMap({ typeFn: () => Thrust })
  thrust!: Thrust;

  @AutoMap({ typeFn: () => Payloads })
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

  @AutoMap({ typeFn: () => Diameter })
  height!: Diameter;

  @AutoMap({ typeFn: () => Diameter })
  diameter!: Diameter;

  @AutoMap({ typeFn: () => Mass })
  mass!: Mass;

  @AutoMap({ typeFn: () => PayloadWeight })
  payload_weights!: PayloadWeight[];

  @AutoMap({ typeFn: () => FirstStage })
  first_stage!: FirstStage;

  @AutoMap({ typeFn: () => SecondStage })
  second_stage!: SecondStage;

  @AutoMap({ typeFn: () => Engines })
  engines!: Engines;

  @AutoMap({ typeFn: () => LandingLegs })
  landing_legs!: LandingLegs;

  @AutoMap({ typeFn: () => String })
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
