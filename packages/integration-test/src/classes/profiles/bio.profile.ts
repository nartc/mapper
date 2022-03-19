import type { Converter, Mapper } from '@automapper/core';
import { convertUsing, createMap, forMember } from '@automapper/core';
import { BioDto, PascalBioDto, SnakeBioDto } from '../dtos/bio.dto';
import { Bio, PascalBio, SnakeBio } from '../models/bio';

const dateToStringConverter: Converter<Bio, string> = {
    convert(source: Bio): string {
        if (source.birthday instanceof Date)
            return source.birthday.toDateString();
        return new Date(source.birthday).toDateString();
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
    createMap(
        mapper,
        Bio,
        BioDto,
        forMember((d) => d.birthday, convertUsing(dateToStringConverter))
    );

    createMap(
        mapper,
        Bio,
        PascalBioDto,
        forMember((d) => d.Birthday, convertUsing(dateToStringConverter))
    );

    createMap(
        mapper,
        Bio,
        SnakeBioDto,
        forMember((d) => d.birthday, convertUsing(dateToStringConverter))
    );
}

export function pascalBioProfile(mapper: Mapper) {
    createMap(
        mapper,
        PascalBio,
        BioDto,
        forMember((d) => d.birthday, convertUsing(pascalDateToStringConverter))
    );

    createMap(
        mapper,
        PascalBio,
        PascalBioDto,
        forMember((d) => d.Birthday, convertUsing(pascalDateToStringConverter))
    );

    createMap(
        mapper,
        PascalBio,
        SnakeBioDto,
        forMember((d) => d.birthday, convertUsing(pascalDateToStringConverter))
    );
}

export function snakeBioProfile(mapper: Mapper) {
    createMap(
        mapper,
        SnakeBio,
        BioDto,
        forMember((d) => d.birthday, convertUsing(snakeDateToStringConverter))
    );

    createMap(
        mapper,
        SnakeBio,
        PascalBioDto,
        forMember((d) => d.Birthday, convertUsing(snakeDateToStringConverter))
    );

    createMap(
        mapper,
        SnakeBio,
        SnakeBioDto,
        forMember((d) => d.birthday, convertUsing(snakeDateToStringConverter))
    );
}
