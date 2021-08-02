import { createMetadataMap } from '@automapper/pojos';

export interface TypeConverterSource {
  value1: string;
  value2: string;
  value3: string;
}

export interface TypeConverterDestination {
  value1: number;
  value2: Date;
  value3: boolean;
}

export function createTypeConverterMetadata() {
  createMetadataMap<TypeConverterSource>('TypeConverterSource', {
    value1: String,
    value2: String,
    value3: String,
  });

  createMetadataMap<TypeConverterDestination>('TypeConverterDestination', {
    value1: Number,
    value2: Date,
    value3: Boolean,
  });
}
