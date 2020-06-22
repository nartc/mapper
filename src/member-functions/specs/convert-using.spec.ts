import {
  Converter,
  MemberMapFunctionId,
  TransformationType,
} from '../../types';
import { convertUsing } from '../convert-using';

describe('ConvertUsingFunction', () => {
  class DateTimeConverter implements Converter<Date, string> {
    convert(source: Date): string {
      return source.toDateString();
    }
  }

  class DateTimeConverter2 implements Converter<{ birthday: Date }, string> {
    convert(source: { birthday: Date }): string {
      return source.birthday.toDateString();
    }
  }

  const source = {
    birthday: new Date('10/14/1991'),
  };

  it('should return correctly', () => {
    const convertUsingFn = convertUsing(
      new DateTimeConverter(),
      s => s.birthday
    );
    expect(convertUsingFn).toBeTruthy();
    expect(convertUsingFn[MemberMapFunctionId.type]).toBe(
      TransformationType.ConvertUsing
    );
    expect(convertUsingFn[MemberMapFunctionId.misc]).toBe(null);
    expect(convertUsingFn[MemberMapFunctionId.fn]).toBeInstanceOf(Function);
  });

  it('should map correctly', () => {
    const convertUsingFn = convertUsing(
      new DateTimeConverter(),
      s => s.birthday
    );
    const result = convertUsingFn[MemberMapFunctionId.fn](source);
    expect(result).toBe(new Date('10/14/1991').toDateString());
  });

  it('should map correctly with source', () => {
    const convertUsingFn = convertUsing(new DateTimeConverter2());
    const result = convertUsingFn[MemberMapFunctionId.fn](source);
    expect(result).toBe(new Date('10/14/1991').toDateString());
  });
});
