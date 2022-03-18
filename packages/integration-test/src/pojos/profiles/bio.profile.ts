import type { Converter, Mapper } from '@automapper/core';
import { convertUsing, createMap, forMember } from '@automapper/core';
import {
    BioDto,
    createBioDtoMetadata,
    PascalBioDto,
    SnakeBioDto,
} from '../dtos/bio.dto';
import { Bio, createBioMetadata, PascalBio, SnakeBio } from '../models/bio';

const dateToStringConverter: Converter<Bio, string> = {
    convert(source: Bio): string {
        return source.birthday.toDateString();
    },
};

const pascalDateToStringConverter: Converter<PascalBio, string> = {
    convert(source: PascalBio): string {
        return source.Birthday.toDateString();
    },
};

const snakeDateToStringConverter: Converter<SnakeBio, string> = {
    convert(source: SnakeBio): string {
        return source.birthday.toDateString();
    },
};

export function bioProfile(mapper: Mapper) {
    createBioMetadata();
    createBioDtoMetadata();

    createMap<Bio, BioDto>(
        mapper,
        'Bio',
        'BioDto',
        forMember((d) => d.birthday, convertUsing(dateToStringConverter))
    );

    createMap<Bio, PascalBioDto>(
        mapper,
        'Bio',
        'PascalBioDto',
        forMember((d) => d.Birthday, convertUsing(dateToStringConverter))
    );

    createMap<Bio, SnakeBioDto>(
        mapper,
        'Bio',
        'SnakeBioDto',
        forMember((d) => d.birthday, convertUsing(dateToStringConverter))
    );
}

export function pascalBioProfile(mapper: Mapper) {
    createBioMetadata();
    createBioDtoMetadata();

    createMap<PascalBio, BioDto>(
        mapper,
        'PascalBio',
        'BioDto',
        forMember((d) => d.birthday, convertUsing(pascalDateToStringConverter))
    );

    createMap<PascalBio, PascalBioDto>(
        mapper,
        'PascalBio',
        'PascalBioDto',
        forMember((d) => d.Birthday, convertUsing(pascalDateToStringConverter))
    );

    createMap<PascalBio, SnakeBioDto>(
        mapper,
        'PascalBio',
        'SnakeBioDto',
        forMember((d) => d.birthday, convertUsing(pascalDateToStringConverter))
    );
}

export function snakeBioProfile(mapper: Mapper) {
    createBioMetadata();
    createBioDtoMetadata();

    createMap<SnakeBio, BioDto>(
        mapper,
        'SnakeBio',
        'BioDto',
        forMember((d) => d.birthday, convertUsing(snakeDateToStringConverter))
    );

    createMap<SnakeBio, PascalBioDto>(
        mapper,
        'SnakeBio',
        'PascalBioDto',
        forMember((d) => d.Birthday, convertUsing(snakeDateToStringConverter))
    );

    createMap<SnakeBio, SnakeBioDto>(
        mapper,
        'SnakeBio',
        'SnakeBioDto',
        forMember((d) => d.birthday, convertUsing(snakeDateToStringConverter))
    );
}
