import type { MappingProfile } from '@automapper/core';
import { mapFrom } from '@automapper/core';
import {
  CompositeFairing,
  Engines,
  FirstStage,
  Payloads,
  PayloadWeight,
  Rocket,
  SecondStage,
  Thrust,
} from '../models/space-x/rocket';
import {
  CompositeFairingDto,
  EnginesDto,
  FirstStageDto,
  PayloadsDto,
  PayloadWeightDto,
  RocketDto,
  SecondStageDto,
  ThrustDto,
} from '../models/space-x/rocket.dto';

export const rocketProfile: MappingProfile = (mapper) => {
  mapper.createMap(Thrust, ThrustDto).forMember(
    (d) => d.kN,
    mapFrom((s) => s.kN)
  );

  mapper.createMap(CompositeFairing, CompositeFairingDto);
  mapper
    .createMap(Payloads, PayloadsDto)
    .forMember(
      (d) => d.option1,
      mapFrom((s) => s.option_1)
    )
    .forMember(
      (d) => d.option2,
      mapFrom((s) => s.option_2)
    );

  mapper.createMap(PayloadWeight, PayloadWeightDto);
  mapper.createMap(FirstStage, FirstStageDto);
  mapper.createMap(SecondStage, SecondStageDto);
  mapper.createMap(Engines, EnginesDto).forMember(
    (d) => d.propellants,
    mapFrom((s) => [s.propellant_1, s.propellant_2])
  );

  mapper.createMap(Rocket, RocketDto);
};
