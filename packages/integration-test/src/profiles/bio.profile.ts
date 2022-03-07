import type { Converter, MappingProfile } from '@automapper/core';
import { convertUsing, createMap, forMember } from '@automapper/core';
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
        forMember((d) => d.birthday, convertUsing(dateToStringConverter))
    );
};
