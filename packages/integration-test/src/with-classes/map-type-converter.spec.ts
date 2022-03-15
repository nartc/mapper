import { classes } from '@automapper/classes';
import {
    addProfile,
    CamelCaseNamingConvention,
    createMapper,
} from '@automapper/core';
import { TypeConverterDto } from './dtos/type-converter.dto';
import { TypeConverter } from './models/type-converter';
import { typeConverterProfile } from './profiles/type-converter.profile';

describe('Map - Type Converter', () => {
    const mapper = createMapper({
        strategyInitializer: classes(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    afterEach(() => {
        mapper.dispose();
    });

    it('should convert simple type', () => {
        addProfile(mapper, typeConverterProfile);

        const dateString = new Date('10/10/2010');
        const tsString = new Date('10/20/2010');

        const source = new TypeConverter();
        source.value1 = '123';
        source.value2 = '10/14/1991';
        source.value3 = 'truthy';
        source.stringValues = ['123', '456', '789'];
        source.value4 = dateString;
        source.value5 = tsString;

        const dto = mapper.map(source, TypeConverter, TypeConverterDto);
        expect(dto).toBeTruthy();
        expect(dto.value1).toEqual(124);
        expect(dto.value2).toEqual(new Date('10/14/1991'));
        expect(dto.value3).toEqual(true);
        expect(dto.stringValues).toEqual([123, 456, 789]);
        expect(dto.value4).toEqual(dateString.toDateString());
        expect(dto.value5).toEqual(tsString.toISOString());
    });
});
