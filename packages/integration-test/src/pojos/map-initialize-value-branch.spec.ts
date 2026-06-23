import { createMap, createMapper, type Mapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';

// Characterization of the MapInitialize value branch in compileStep (map.ts):
// primitives, Date instances, and File values are assigned AS-IS (never deep
// mapped / cloned), and File is detected by its `[object File]` tag. These pin
// the behavior refactored here (scalar fast-path ordering + Symbol.toStringTag
// File detection) so the refactor is provably behavior-preserving.
describe('MapInitialize value branch (Date / File / array)', () => {
    let mapper: Mapper;

    beforeEach(() => {
        mapper = createMapper({ strategyInitializer: pojos() });
    });

    afterEach(() => {
        mapper.dispose();
        PojosMetadataMap.reset();
    });

    it('assigns a Date member as-is (same value, still a Date — not cloned/mapped)', () => {
        PojosMetadataMap.create('HasDate', { when: Date });
        PojosMetadataMap.create('HasDateDto', { when: Date });
        createMap(mapper, 'HasDate', 'HasDateDto');

        const when = new Date('2020-01-02T03:04:05.000Z');
        const dto = mapper.map({ when }, 'HasDate', 'HasDateDto') as {
            when: Date;
        };

        expect(dto.when).toBeInstanceOf(Date);
        expect(dto.when.getTime()).toBe(when.getTime());
    });

    it('assigns a File value as-is via its tag, even when src/dest member identifiers differ', () => {
        // Different nested identifiers => sameIdentifier is false, so without the
        // File detection this would fall into the object branch and throw
        // (no SrcDoc -> DstDoc mapping registered).
        PojosMetadataMap.create('HasDoc', { doc: 'SrcDoc' });
        PojosMetadataMap.create('HasDocDto', { doc: 'DstDoc' });
        createMap(mapper, 'HasDoc', 'HasDocDto');

        // Object.prototype.toString.call(fileLike) === '[object File]'
        const fileLike = { [Symbol.toStringTag]: 'File', name: 'a.txt' };
        const dto = mapper.map({ doc: fileLike }, 'HasDoc', 'HasDocDto') as {
            doc: unknown;
        };

        expect(dto.doc).toBe(fileLike);
    });

    it('does NOT treat a plain object whose class is named "File" as a File (tag, not constructor.name)', () => {
        // Discriminates Symbol.toStringTag (correct) from constructor.name (wrong):
        // this object has constructor.name === 'File' but no '[object File]' tag,
        // so it must go through the normal object (nested-map) branch.
        class File {
            value = 1;
        }
        PojosMetadataMap.create('HasObj', { obj: 'SrcObj' });
        PojosMetadataMap.create('HasObjDto', { obj: 'DstObj' });
        PojosMetadataMap.create('SrcObj', { value: Number });
        PojosMetadataMap.create('DstObj', { value: Number });
        createMap(mapper, 'SrcObj', 'DstObj');
        createMap(mapper, 'HasObj', 'HasObjDto');

        const dto = mapper.map({ obj: new File() }, 'HasObj', 'HasObjDto') as {
            obj: { value: number };
        };

        expect(dto.obj).not.toBeInstanceOf(File);
        expect(dto.obj.value).toBe(1);
    });

    it('shallow-copies an array of File values (new array, elements by reference)', () => {
        PojosMetadataMap.create('HasDocs', { docs: ['SrcDoc'] });
        PojosMetadataMap.create('HasDocsDto', { docs: ['DstDoc'] });
        createMap(mapper, 'HasDocs', 'HasDocsDto');

        const fileLike = { [Symbol.toStringTag]: 'File', name: 'a.txt' };
        const input = [fileLike];
        const dto = mapper.map({ docs: input }, 'HasDocs', 'HasDocsDto') as {
            docs: unknown[];
        };

        expect(dto.docs).not.toBe(input);
        expect(dto.docs[0]).toBe(fileLike);
    });

    it('assigns a primitive scalar member as-is', () => {
        PojosMetadataMap.create('HasNum', { n: Number, s: String });
        PojosMetadataMap.create('HasNumDto', { n: Number, s: String });
        createMap(mapper, 'HasNum', 'HasNumDto');

        const dto = mapper.map({ n: 42, s: 'hi' }, 'HasNum', 'HasNumDto') as {
            n: number;
            s: string;
        };

        expect(dto.n).toBe(42);
        expect(dto.s).toBe('hi');
    });
});
