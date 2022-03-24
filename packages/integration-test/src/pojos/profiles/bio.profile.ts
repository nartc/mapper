import type { Converter, Mapper } from '@automapper/core';
import { convertUsing, createMap, forMember } from '@automapper/core';
import {
    BioDto,
    createBioDtoMetadata,
    PascalBioDto,
    SnakeBioDto,
} from '../dtos/bio.dto';
import { Bio, createBioMetadata, PascalBio, SnakeBio } from '../models/bio';

const dateToStringConverter: Converter<Date, string> = {
    convert(source: Date): string {
        return source.toDateString();
    },
};

export function bioProfile(mapper: Mapper) {
    createBioMetadata();
    createBioDtoMetadata();

    createMap<Bio, BioDto>(
        mapper,
        'Bio',
        'BioDto',
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );

    createMap<Bio, PascalBioDto>(
        mapper,
        'Bio',
        'PascalBioDto',
        forMember(
            (d) => d.Birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );

    createMap<Bio, SnakeBioDto>(
        mapper,
        'Bio',
        'SnakeBioDto',
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );
}

export function pascalBioProfile(mapper: Mapper) {
    createBioMetadata();
    createBioDtoMetadata();

    createMap<PascalBio, BioDto>(
        mapper,
        'PascalBio',
        'BioDto',
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.Birthday)
        )
    );

    createMap<PascalBio, PascalBioDto>(
        mapper,
        'PascalBio',
        'PascalBioDto',
        forMember(
            (d) => d.Birthday,
            convertUsing(dateToStringConverter, (s) => s.Birthday)
        )
    );

    createMap<PascalBio, SnakeBioDto>(
        mapper,
        'PascalBio',
        'SnakeBioDto',
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.Birthday)
        )
    );
}

export function snakeBioProfile(mapper: Mapper) {
    createBioMetadata();
    createBioDtoMetadata();

    createMap<SnakeBio, BioDto>(
        mapper,
        'SnakeBio',
        'BioDto',
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );

    createMap<SnakeBio, PascalBioDto>(
        mapper,
        'SnakeBio',
        'PascalBioDto',
        forMember(
            (d) => d.Birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );

    createMap<SnakeBio, SnakeBioDto>(
        mapper,
        'SnakeBio',
        'SnakeBioDto',
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );
}
