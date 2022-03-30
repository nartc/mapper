import type { Converter } from '../../types';
import { MapFnClassId, TransformationType } from '../../types';
import { convertUsing } from '../convert-using';

describe(convertUsing.name, () => {
    const birthdayToStringConverter: Converter<Date, string> = {
        convert(src: Date): string {
            return src.toDateString();
        },
    };

    const source: { birthday: Date; birth?: Date } = {
        birthday: new Date('10/14/1991'),
    };

    it('should return correctly', () => {
        const convertUsingFn = convertUsing<typeof source, {}>(
            birthdayToStringConverter,
            (s) => s.birthday
        );
        expect(convertUsingFn).toBeTruthy();
        expect(convertUsingFn[MapFnClassId.type]).toEqual(
            TransformationType.ConvertUsing
        );
        expect(convertUsingFn[MapFnClassId.fn]).toBeInstanceOf(Function);
    });

    it('should map correctly', () => {
        const convertUsingFn = convertUsing<typeof source, {}>(
            birthdayToStringConverter,
            (s) => s.birthday
        );
        const result = convertUsingFn[MapFnClassId.fn](source);
        expect(result).toEqual(source.birthday.toDateString());
    });
});
