import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import {
    CompositeFairingDto,
    EnginesDto,
    FirstStageDto,
    PayloadsDto,
    PayloadWeightDto,
    RocketDto,
    SecondStageDto,
    ThrustDto,
} from '../dtos/rocket.dto';
import {
    CompositeFairing,
    Engines,
    FirstStage,
    Payloads,
    PayloadWeight,
    Rocket,
    SecondStage,
    Thrust,
} from '../models/rocket';

export function rocketProfile(mapper: Mapper) {
    createMap(
        mapper,
        Thrust,
        ThrustDto,
        forMember(
            (d) => d.kN,
            mapFrom((s) => s.kN)
        )
    );

    createMap(mapper, CompositeFairing, CompositeFairingDto);
    createMap(
        mapper,
        Payloads,
        PayloadsDto,
        forMember(
            (d) => d.option1,
            mapFrom((s) => s.option_1)
        ),
        forMember(
            (d) => d.option2,
            mapFrom((s) => s.option_2)
        )
    );

    createMap(mapper, PayloadWeight, PayloadWeightDto);
    createMap(mapper, FirstStage, FirstStageDto);
    createMap(mapper, SecondStage, SecondStageDto);
    createMap(
        mapper,
        Engines,
        EnginesDto,
        forMember(
            (d) => d.propellants,
            mapFrom((s) => [s.propellant_1, s.propellant_2])
        )
    );
    createMap(mapper, Rocket, RocketDto);
}
