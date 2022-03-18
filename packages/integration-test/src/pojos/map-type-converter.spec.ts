import {
    addProfile,
    CamelCaseNamingConvention,
    createMapper,
} from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { TypeConverterDto } from './dtos/type-converter.dto';
import { TypeConverter } from './models/type-converter';
import { typeConverterProfile } from './profiles/type-converter.profile';

describe('Map - Type Converter', () => {
    const mapper = createMapper({
        strategyInitializer: pojos(),
        namingConventions: new CamelCaseNamingConvention(),
    });

    afterEach(() => {
        mapper.dispose();
        PojosMetadataMap.reset();
    });

    it('should convert simple type', () => {
        addProfile(mapper, typeConverterProfile);

        const dateString = new Date('10/10/2010');

        const source: TypeConverter = {
            value1: '123',
            value2: '10/14/1991',
            value3: 'truthy',
            stringValues: ['123', '456', '789'],
            value4: dateString,
        };

        const dto = mapper.map<TypeConverter, TypeConverterDto>(
            source,
            'TypeConverter',
            'TypeConverterDto'
        );
        expect(dto).toBeTruthy();
        expect(dto.value1).toEqual(124);
        expect(dto.value2).toEqual(new Date('10/14/1991'));
        expect(dto.value3).toEqual(true);
        expect(dto.stringValues).toEqual([123, 456, 789]);
        expect(dto.value4).toEqual(dateString.toDateString());
    });
});
