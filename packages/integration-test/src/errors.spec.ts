import {
    AutoMapperError,
    createMapper,
    MappingNotFoundError,
} from '@automapper/core';
import { pojos } from '@automapper/pojos';

describe('typed errors', () => {
    it('throws MappingNotFoundError (an AutoMapperError) when no mapping exists', () => {
        const mapper = createMapper({ strategyInitializer: pojos() });

        expect(() => mapper.map({}, 'Source', 'Destination')).toThrow(
            MappingNotFoundError
        );

        try {
            mapper.map({}, 'Source', 'Destination');
            throw new Error('expected map() to throw');
        } catch (e) {
            expect(e).toBeInstanceOf(AutoMapperError);
            expect(e).toBeInstanceOf(MappingNotFoundError);
            expect((e as MappingNotFoundError).sourceName).toBe('Source');
            expect((e as MappingNotFoundError).destinationName).toBe(
                'Destination'
            );
        }
    });
});
