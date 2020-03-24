import {
  Converter,
  MemberMapFunctionReturnClassId,
  TransformationType,
} from '../../types';
import { convertUsing } from '../convert-using';

describe('ConvertUsingFunction', () => {
  class DateTimeConverter implements Converter<Date, string> {
    convert(source: Date): string {
      return source.toDateString();
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
    expect(convertUsingFn[MemberMapFunctionReturnClassId.type]).toBe(
      TransformationType.ConvertUsing
    );
    expect(convertUsingFn[MemberMapFunctionReturnClassId.misc]).toBe(null);
    expect(convertUsingFn[MemberMapFunctionReturnClassId.fn]).toBeInstanceOf(
      Function
    );
  });

  it('should map correctly', () => {
    const convertUsingFn = convertUsing(
      new DateTimeConverter(),
      s => s.birthday
    );
    const result = convertUsingFn[MemberMapFunctionReturnClassId.fn](source);
    expect(result).toBe(new Date('10/14/1991').toDateString());
  });
});
