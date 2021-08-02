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

export interface TypeConverterCamelSource {
  valueOne: string;
  valueTwo: string;
}

export interface TypeConverterSnakeDestination {
  value_one: number;
  value_two: Date;
}

export interface TypeConverterPascalDestination {
  ValueOne: number;
  ValueTwo: Date;
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

  createMetadataMap<TypeConverterCamelSource>('TypeConverterCamelSource', {
    valueOne: String,
    valueTwo: String,
  });

  createMetadataMap<TypeConverterSnakeDestination>(
    'TypeConverterSnakeDestination',
    {
      value_one: Number,
      value_two: Date,
    }
  );

  createMetadataMap<TypeConverterPascalDestination>(
    'TypeConverterPascalDestination',
    {
      ValueOne: Number,
      ValueTwo: Date,
    }
  );
}
