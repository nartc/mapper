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

    @AutoMap(() => Number)
    burnTimeSec!: number | null;

    @AutoMap(() => ThrustDto)
    thrustSeaLevel!: ThrustDto;

    @AutoMap(() => ThrustDto)
    thrustVacuum!: ThrustDto;

    @AutoMap()
    cores?: number;
}

export class CompositeFairingDto {
    @AutoMap(() => Number)
    heightMeters!: number | null;

    @AutoMap(() => Number)
    heightFeet!: number | null;

    @AutoMap(() => Number)
    diameterMeters!: number | null;

    @AutoMap(() => Number)
    diameterFeet!: number | null;
}

export class PayloadsDto {
    @AutoMap()
    option1!: string;

    @AutoMap(() => CompositeFairingDto)
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

    @AutoMap(() => Number)
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

    @AutoMap(() => String)
    layout!: null | string;

    @AutoMap()
    ispSeaLevel!: number;

    @AutoMap()
    ispVacuum!: number;

    @AutoMap(() => Number)
    engineLossMax!: number | null;

    @AutoMap(() => [String])
    propellants!: string[];

    @AutoMap(() => ThrustDto)
    thrustSeaLevel!: ThrustDto;

    @AutoMap(() => ThrustDto)
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

    @AutoMap(() => Number)
    heightMeters!: number | null;

    @AutoMap(() => Number)
    heightFeet!: number | null;

    @AutoMap(() => Number)
    diameterMeters!: number | null;

    @AutoMap(() => Number)
    diameterFeet!: number | null;

    @AutoMap(() => Number)
    massKg!: number | null;

    @AutoMap(() => Number)
    massLb!: number | null;

    @AutoMap(() => [PayloadWeightDto])
    payloadWeights!: PayloadWeightDto[];

    @AutoMap(() => FirstStageDto)
    firstStage!: FirstStageDto;

    @AutoMap(() => SecondStageDto)
    secondStage!: SecondStageDto;

    @AutoMap(() => EnginesDto)
    engines!: EnginesDto;

    @AutoMap()
    landingLegsNumber!: number;

    @AutoMap(() => String)
    landingLegsMaterial!: string | null;

    @AutoMap(() => [String])
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
