import { PojosMetadataMap } from '@automapper/pojos';

export interface TypeConverterDto {
    value1: number;
    value2: Date;
    value3: boolean;
    stringValues: number[];
    value4: string;
}

export function createTypeConverterDtoMetadata() {
    PojosMetadataMap.create<TypeConverterDto>('TypeConverterDto', {
        value1: Number,
        value2: Date,
        value3: Boolean,
        stringValues: [Number],
        value4: String,
    });
}
