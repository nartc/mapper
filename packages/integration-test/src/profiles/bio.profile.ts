import type { Converter, MappingProfile } from '@automapper/core';
import {
    convertUsing,
    createMap,
    forMember,
    typeConverter,
} from '@automapper/core';
import { BioDto } from '../dtos/bio.dto';
import { Bio } from '../models/bio';

const dateToStringConverter: Converter<Bio, string> = {
    convert(source: Bio): string {
        return source.birthday.toDateString();
    },
};

export const bioProfile: MappingProfile = (mapper) => {
    createMap(
        mapper,
        Bio,
        BioDto,
        typeConverter(Date, String, (date) => date.toDateString()),
        typeConverter([Date], [String], (manyDates) =>
            manyDates.map((each) => each.toDateString())
        ),
        typeConverter([Date], String, (manyDates) =>
            manyDates.map((each) => each.toDateString()).join('')
        ),
        typeConverter(Date, [String], (date) => [date.toDateString()]),
        forMember((d) => d.birthday, convertUsing(dateToStringConverter))
    );
};
