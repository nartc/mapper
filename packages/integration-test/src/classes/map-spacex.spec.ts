import { classes } from '@automapper/classes';
import {
    addProfile,
    CamelCaseNamingConvention,
    createMapper,
    SnakeCaseNamingConvention,
} from '@automapper/core';
import { RocketDto } from './dtos/rocket.dto';
import { Rocket } from './models/rocket';
import { rocketProfile } from './profiles/rocket.profile';
import { getRocket } from './utils/get-rocket';

describe('Map - SpaceX example', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: {
            source: new SnakeCaseNamingConvention(),
            destination: new CamelCaseNamingConvention(),
        },
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should map rocket to rocket dto properly', () => {
        addProfile(mapper, rocketProfile);

        const rocket = getRocket();
        const dto = mapper.map(rocket, Rocket, RocketDto);
        assertRocketDto(rocket, dto);
    });

    it('should map plain object rocket to rocket dto properly', () => {
        addProfile(mapper, rocketProfile);

        const rocket = getRocket();
        const dto = mapper.map(Object.assign({}, rocket), Rocket, RocketDto);
        assertRocketDto(rocket, dto);
    });
});

function assertRocketDto(rocket: Rocket, dto: RocketDto) {
    expect(dto).toBeTruthy();
    expect(dto.id).toEqual(rocket.id);
    expect(dto.rocketId).toEqual(rocket.rocket_id);
    expect(dto.rocketName).toEqual(rocket.rocket_name);
    expect(dto.rocketType).toEqual(rocket.rocket_type);

    expect(dto.active).toEqual(rocket.active);
    expect(dto.boosters).toEqual(rocket.boosters);
    expect(dto.company).toEqual(rocket.company);
    expect(dto.country).toEqual(rocket.country);
    expect(dto.description).toEqual(rocket.description);
    expect(dto.stages).toEqual(rocket.stages);
    expect(dto.wikipedia).toEqual(rocket.wikipedia);

    expect(dto.costPerLaunch).toEqual(rocket.cost_per_launch);
    expect(dto.firstFlight).toEqual(rocket.first_flight);
    expect(dto.flickrImages).toEqual(rocket.flickr_images);
    expect(dto.successRatePct).toEqual(rocket.success_rate_pct);

    expect(dto.landingLegsMaterial).toEqual(rocket.landing_legs.material);
    expect(dto.landingLegsNumber).toEqual(rocket.landing_legs.number);

    expect(dto.diameterFeet).toEqual(rocket.diameter.feet);
    expect(dto.diameterMeters).toEqual(rocket.diameter.meters);

    expect(dto.heightFeet).toEqual(rocket.height.feet);
    expect(dto.heightMeters).toEqual(rocket.height.meters);

    expect(dto.massKg).toEqual(rocket.mass.kg);
    expect(dto.massLb).toEqual(rocket.mass.lb);

    expect(dto.engines.propellants).toEqual([
        rocket.engines.propellant_1,
        rocket.engines.propellant_2,
    ]);
    expect(dto.engines.engineLossMax).toEqual(rocket.engines.engine_loss_max);
    expect(dto.engines.layout).toEqual(rocket.engines.layout);
    expect(dto.engines.number).toEqual(rocket.engines.number);
    expect(dto.engines.thrustToWeight).toEqual(rocket.engines.thrust_to_weight);
    expect(dto.engines.type).toEqual(rocket.engines.type);
    expect(dto.engines.version).toEqual(rocket.engines.version);

    expect(dto.engines.ispSeaLevel).toEqual(rocket.engines.isp.sea_level);
    expect(dto.engines.ispVacuum).toEqual(rocket.engines.isp.vacuum);

    expect(dto.engines.thrustSeaLevel.kN).toEqual(
        rocket.engines.thrust_sea_level.kN
    );
    expect(dto.engines.thrustSeaLevel.lbf).toEqual(
        rocket.engines.thrust_sea_level.lbf
    );

    expect(dto.engines.thrustVacuum.kN).toEqual(
        rocket.engines.thrust_vacuum.kN
    );
    expect(dto.engines.thrustVacuum.lbf).toEqual(
        rocket.engines.thrust_vacuum.lbf
    );

    expect(dto.firstStage.burnTimeSec).toEqual(
        rocket.first_stage.burn_time_sec
    );
    expect(dto.firstStage.cores).toEqual(rocket.first_stage.cores);
    expect(dto.firstStage.engines).toEqual(rocket.first_stage.engines);
    expect(dto.firstStage.fuelAmountTons).toEqual(
        rocket.first_stage.fuel_amount_tons
    );
    expect(dto.firstStage.reusable).toEqual(rocket.first_stage.reusable);

    expect(dto.firstStage.thrustSeaLevel.kN).toEqual(
        rocket.first_stage.thrust_sea_level.kN
    );
    expect(dto.firstStage.thrustSeaLevel.lbf).toEqual(
        rocket.first_stage.thrust_sea_level.lbf
    );

    expect(dto.firstStage.thrustVacuum.kN).toEqual(
        rocket.first_stage.thrust_vacuum.kN
    );
    expect(dto.firstStage.thrustVacuum.lbf).toEqual(
        rocket.first_stage.thrust_vacuum.lbf
    );

    expect(dto.secondStage.burnTimeSec).toEqual(
        rocket.second_stage.burn_time_sec
    );
    expect(dto.secondStage.engines).toEqual(rocket.second_stage.engines);
    expect(dto.secondStage.fuelAmountTons).toEqual(
        rocket.second_stage.fuel_amount_tons
    );
    expect(dto.secondStage.reusable).toEqual(rocket.second_stage.reusable);

    expect(dto.secondStage.thrust.kN).toEqual(rocket.second_stage.thrust.kN);
    expect(dto.secondStage.thrust.lbf).toEqual(rocket.second_stage.thrust.lbf);

    expect(dto.secondStage.payloads.option1).toEqual(
        rocket.second_stage.payloads.option_1
    );
    expect(dto.secondStage.payloads.option2).toEqual(
        rocket.second_stage.payloads.option_2
    );

    expect(dto.secondStage.payloads.compositeFairing.diameterFeet).toEqual(
        rocket.second_stage.payloads.composite_fairing.diameter.feet
    );
    expect(dto.secondStage.payloads.compositeFairing.diameterMeters).toEqual(
        rocket.second_stage.payloads.composite_fairing.diameter.meters
    );
    expect(dto.secondStage.payloads.compositeFairing.heightFeet).toEqual(
        rocket.second_stage.payloads.composite_fairing.height.feet
    );
    expect(dto.secondStage.payloads.compositeFairing.heightMeters).toEqual(
        rocket.second_stage.payloads.composite_fairing.height.meters
    );

    expect(dto.payloadWeights.length).toEqual(rocket.payload_weights.length);

    rocket.payload_weights.forEach((payloadWeights, index) => {
        expect(dto.payloadWeights[index].id).toEqual(payloadWeights.id);
        expect(dto.payloadWeights[index].kg).toEqual(payloadWeights.kg);
        expect(dto.payloadWeights[index].lb).toEqual(payloadWeights.lb);
        expect(dto.payloadWeights[index].name).toEqual(payloadWeights.name);
    });
}
