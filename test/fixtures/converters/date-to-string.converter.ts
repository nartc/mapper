import { Converter } from '../../../src';

export class DateToStringConverter implements Converter<Date, string> {
  convert(source: Date): string {
    return source.toDateString();
  }
}
