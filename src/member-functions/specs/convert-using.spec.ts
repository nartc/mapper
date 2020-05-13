import { Converter, TransformationType } from '../../types';
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
    expect(convertUsingFn[0]).toBe(TransformationType.ConvertUsing);
    expect(convertUsingFn[1]).toBe(null);
    expect(convertUsingFn[2]).toBeInstanceOf(Function);
  });

  it('should map correctly', () => {
    const convertUsingFn = convertUsing(
      new DateTimeConverter(),
      s => s.birthday
    );
    const result = convertUsingFn[2](source);
    expect(result).toBe(new Date('10/14/1991').toDateString());
  });
});
