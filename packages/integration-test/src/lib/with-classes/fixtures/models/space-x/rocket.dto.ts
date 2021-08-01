import { AutoMap } from '@automapper/classes';

export class PayloadWeightDto {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  kg!: number;

  @AutoMap()
  lb!: number;
}

export class ThrustDto {
  @AutoMap()
  kN!: number;

  @AutoMap()
  lbf!: number;
}

export class FirstStageDto {
  @AutoMap()
  reusable!: boolean;

  @AutoMap()
  engines!: number;

  @AutoMap()
  fuelAmountTons!: number;

  @AutoMap({ typeFn: () => Number })
  burnTimeSec!: number | null;

  @AutoMap({ typeFn: () => ThrustDto })
  thrustSeaLevel!: ThrustDto;

  @AutoMap({ typeFn: () => ThrustDto })
  thrustVacuum!: ThrustDto;

  @AutoMap()
  cores?: number;
}

export class CompositeFairingDto {
  @AutoMap({ typeFn: () => Number })
  heightMeters!: number | null;

  @AutoMap({ typeFn: () => Number })
  heightFeet!: number | null;

  @AutoMap({ typeFn: () => Number })
  diameterMeters!: number | null;

  @AutoMap({ typeFn: () => Number })
  diameterFeet!: number | null;
}

export class PayloadsDto {
  @AutoMap()
  option1!: string;

  @AutoMap({ typeFn: () => CompositeFairingDto })
  compositeFairing!: CompositeFairingDto;

  @AutoMap()
  option2?: string;
}

export class SecondStageDto {
  @AutoMap()
  reusable!: boolean;

  @AutoMap()
  engines!: number;

  @AutoMap()
  fuelAmountTons!: number;

  @AutoMap({ typeFn: () => Number })
  burnTimeSec!: number | null;

  @AutoMap()
  thrust!: ThrustDto;

  @AutoMap()
  payloads!: PayloadsDto;
}

export class EnginesDto {
  @AutoMap()
  number!: number;

  @AutoMap()
  type!: string;

  @AutoMap()
  version!: string;

  @AutoMap()
  layout!: null | string;

  @AutoMap()
  ispSeaLevel!: number;

  @AutoMap()
  ispVacuum!: number;

  @AutoMap({ typeFn: () => Number })
  engineLossMax!: number | null;

  @AutoMap()
  propellants!: string[];

  @AutoMap({ typeFn: () => ThrustDto })
  thrustSeaLevel!: ThrustDto;

  @AutoMap({ typeFn: () => ThrustDto })
  thrustVacuum!: ThrustDto;

  @AutoMap()
  thrustToWeight!: number;
}

export class RocketDto {
  @AutoMap()
  id!: number;

  @AutoMap()
  active!: boolean;

  @AutoMap()
  stages!: number;

  @AutoMap()
  boosters!: number;

  @AutoMap()
  costPerLaunch!: number;

  @AutoMap()
  successRatePct!: number;

  @AutoMap()
  firstFlight!: Date;

  @AutoMap()
  country!: string;

  @AutoMap()
  company!: string;

  @AutoMap({ typeFn: () => Number })
  heightMeters!: number | null;

  @AutoMap({ typeFn: () => Number })
  heightFeet!: number | null;

  @AutoMap({ typeFn: () => Number })
  diameterMeters!: number | null;

  @AutoMap({ typeFn: () => Number })
  diameterFeet!: number | null;

  @AutoMap({ typeFn: () => Number })
  massKg!: number | null;

  @AutoMap({ typeFn: () => Number })
  massLb!: number | null;

  @AutoMap({ typeFn: () => PayloadWeightDto })
  payloadWeights!: PayloadWeightDto[];

  @AutoMap({ typeFn: () => FirstStageDto })
  firstStage!: FirstStageDto;

  @AutoMap({ typeFn: () => SecondStageDto })
  secondStage!: SecondStageDto;

  @AutoMap({ typeFn: () => EnginesDto })
  engines!: EnginesDto;

  @AutoMap()
  landingLegsNumber!: number;

  @AutoMap({ typeFn: () => String })
  landingLegsMaterial!: string | null;

  @AutoMap()
  flickrImages!: string[];

  @AutoMap()
  wikipedia!: string;

  @AutoMap()
  description!: string;

  @AutoMap()
  rocketId!: string;

  @AutoMap()
  rocketName!: string;

  @AutoMap()
  rocketType!: string;
}
