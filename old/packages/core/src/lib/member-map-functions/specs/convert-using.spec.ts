import type { Converter } from '../../types';
import { MapFnClassId, TransformationType } from '../../types';
import { convertUsing } from '../convert-using';

describe('ConvertUsingFunction', () => {
  const dateToStringConverter: Converter<Date, string> = {
    convert(date: Date): string {
      return date.toDateString();
    },
  };

  const birthdayToStringConverter: Converter<{ birthday: Date }, string> = {
    convert(src: { birthday: Date }): string {
      return src.birthday.toDateString();
    },
  };

  const source: { birthday: Date; birth?: Date } = {
    birthday: new Date('10/14/1991'),
  };

  it('should return correctly', () => {
    const convertUsingFn = convertUsing(
      dateToStringConverter,
      () => new Date()
    );
    expect(convertUsingFn).toBeTruthy();
    expect(convertUsingFn[MapFnClassId.type]).toEqual(
      TransformationType.ConvertUsing
    );
    expect(convertUsingFn[MapFnClassId.fn]).toBeInstanceOf(Function);
  });

  it('should map correctly', () => {
    const convertUsingFn = convertUsing(
      dateToStringConverter,
      (s: typeof source) => s.birthday
    );
    const result = convertUsingFn[MapFnClassId.fn](source);
    expect(result).toEqual(source.birthday.toDateString());
  });

  it('should map correctly with source', () => {
    const convertUsingFn = convertUsing(birthdayToStringConverter);
    const result = convertUsingFn[MapFnClassId.fn](source);
    expect(result).toEqual(source.birthday.toDateString());
  });
});
