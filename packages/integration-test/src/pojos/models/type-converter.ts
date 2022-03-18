import { PojosMetadataMap } from '@automapper/pojos';

export interface TypeConverter {
    value1: string;
    value2: string;
    value3: string;
    stringValues: string[];
    value4: Date;
}

export function createTypeConverterMetadata() {
    PojosMetadataMap.create<TypeConverter>('TypeConverter', {
        value1: String,
        value2: String,
        value3: String,
        stringValues: [String],
        value4: Date,
    });
}
