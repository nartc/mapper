import type { Converter, Mapper } from '@automapper/core';
import { convertUsing, createMap, forMember } from '@automapper/core';
import { BioDto, PascalBioDto, SnakeBioDto } from '../dtos/bio.dto';
import { Bio, PascalBio, SnakeBio } from '../models/bio';

const dateToStringConverter: Converter<Date, string> = {
    convert(source: Date): string {
        if (source instanceof Date) return source.toDateString();
        return new Date(source).toDateString();
    },
};

export function bioProfile(mapper: Mapper) {
    createMap(
        mapper,
        Bio,
        BioDto,
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );

    createMap(
        mapper,
        Bio,
        PascalBioDto,
        forMember(
            (d) => d.Birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );

    createMap(
        mapper,
        Bio,
        SnakeBioDto,
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );
}

export function pascalBioProfile(mapper: Mapper) {
    createMap(
        mapper,
        PascalBio,
        BioDto,
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.Birthday)
        )
    );

    createMap(
        mapper,
        PascalBio,
        PascalBioDto,
        forMember(
            (d) => d.Birthday,
            convertUsing(dateToStringConverter, (s) => s.Birthday)
        )
    );

    createMap(
        mapper,
        PascalBio,
        SnakeBioDto,
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.Birthday)
        )
    );
}

export function snakeBioProfile(mapper: Mapper) {
    createMap(
        mapper,
        SnakeBio,
        BioDto,
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );

    createMap(
        mapper,
        SnakeBio,
        PascalBioDto,
        forMember(
            (d) => d.Birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );

    createMap(
        mapper,
        SnakeBio,
        SnakeBioDto,
        forMember(
            (d) => d.birthday,
            convertUsing(dateToStringConverter, (s) => s.birthday)
        )
    );
}
