import type { Converter } from '@automapper/core';

export const dateToStringConverter: Converter<Date, string> = {
  convert(source: Date): string {
    return source.toDateString();
  },
};
