import type { Converter } from '@automapper/types';

export const dateToStringConverter: Converter<Date, string> = {
  convert(source: Date): string {
    return source.toDateString();
  },
};
