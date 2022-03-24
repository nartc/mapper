import 'reflect-metadata';
import { AUTOMAP_PROPERTIES_METADATA_KEY } from '../keys';
import { AutoMap } from '../automap';

describe(AutoMap.name, () => {
    const spiedReflectDefine = jest.spyOn(Reflect, 'defineMetadata');
    const spiedReflectGet = jest.spyOn(Reflect, 'getMetadata');

    describe('primitives', () => {
        class Bar {
            @AutoMap()
            bar!: string;
        }

        it('should call getMetadata', () => {
            expect(spiedReflectGet).toHaveBeenCalledWith(
                'design:type',
                Bar.prototype,
                'bar'
            );
            spiedReflectGet.mockReset();
        });

        it('should call defineMetadata', () => {
            spiedReflectGet.mockReturnValueOnce(String);
            expect(spiedReflectDefine).toHaveBeenCalledWith(
                AUTOMAP_PROPERTIES_METADATA_KEY,
                [
                    [
                        'bar',
                        {
                            type: expect.any(Function),
                            depth: 1,
                            isGetterOnly: undefined,
                        },
                    ],
                ],
                Bar
            );
            spiedReflectGet.mockReset();
        });
    });

    describe('explicit type', () => {
        class Foo {
            @AutoMap(() => Date)
            date!: Date;
        }

        it('should call defineMetadata', () => {
            expect(spiedReflectDefine).toHaveBeenCalledWith(
                AUTOMAP_PROPERTIES_METADATA_KEY,
                [['date', { type: expect.any(Function), depth: 1 }]],
                Foo
            );
            spiedReflectDefine.mockReset();
        });
    });
});
