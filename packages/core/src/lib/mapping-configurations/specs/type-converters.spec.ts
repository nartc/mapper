import type { Mapping } from '../../types';
import { MappingClassId } from '../../types';
import { typeConverter } from '../type-converters';

describe(typeConverter.name, () => {
    it('should update mapping type converters for Type to Type', () => {
        const mapping = [] as unknown as Mapping;
        const selector = jest.fn();
        typeConverter(String, Number, selector)(mapping);

        /**
         *   String => Array [
         *     Map {
         *       Number => Array [
         *         [MockFunction],
         *         undefined,
         *       ],
         *     },
         *     Map {},
         *   ],
         */
        expect(mapping[MappingClassId.typeConverters]!.get(String)).toEqual([
            new Map([[Number, [selector, undefined]]]),
            new Map(),
        ]);
    });

    it('should update mapping type converters for [Type] to [Type]', () => {
        const mapping = [] as unknown as Mapping;
        const selector = jest.fn();
        typeConverter([String], [Number], selector)(mapping);

        /**
         *   String => Array [
         *     Map {},
         *     Map {
         *       Number => Array [
         *         undefined,
         *         [MockFunction],
         *       ],
         *     },
         *   ],
         */
        expect(mapping[MappingClassId.typeConverters]!.get(String)).toEqual([
            new Map(),
            new Map([[Number, [undefined, selector]]]),
        ]);
    });

    it('should update mapping type converters for Type to [Type]', () => {
        const mapping = [] as unknown as Mapping;
        const selector = jest.fn();
        typeConverter(String, [Number], selector)(mapping);

        /**
         *   String => Array [
         *     Map {
         *       Number => Array [
         *         undefined,
         *         [MockFunction],
         *       ],
         *     },
         *     Map {},
         *   ],
         */
        expect(mapping[MappingClassId.typeConverters]!.get(String)).toEqual([
            new Map([[Number, [undefined, selector]]]),
            new Map(),
        ]);
    });

    it('should update mapping type converters for [Type] to Type', () => {
        const mapping = [] as unknown as Mapping;
        const selector = jest.fn();
        typeConverter([String], Number, selector)(mapping);

        /**
         *   String => Array [
         *     Map {},
         *     Map {
         *       Number => Array [
         *         [MockFunction],
         *         undefined,
         *       ],
         *     },
         *   ],
         */
        expect(mapping[MappingClassId.typeConverters]!.get(String)).toEqual([
            new Map(),
            new Map([[Number, [selector, undefined]]]),
        ]);
    });
});
