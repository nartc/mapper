import 'reflect-metadata';
import { AUTOMAP_PROPERTIES_METADATA_KEY } from '../../constants';
import { AutoMap } from '../automap.decorator';

describe('AutomapDecorator', () => {
  const spiedReflectDefine = jest.spyOn(Reflect, 'defineMetadata');
  const spiedReflectGet = jest.spyOn(Reflect, 'getMetadata');

  describe('for primitives', () => {
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
            { typeFn: expect.any(Function), depth: 0, isGetterOnly: undefined },
          ],
        ],
        Bar
      );
      spiedReflectGet.mockReset();
    });
  });

  describe('for typeFn', () => {
    class Foo {
      @AutoMap({ typeFn: () => Date })
      date!: Date;
    }

    it('should call defineMetadata', () => {
      expect(spiedReflectDefine).toHaveBeenCalledWith(
        AUTOMAP_PROPERTIES_METADATA_KEY,
        [['date', { typeFn: expect.any(Function), depth: 0 }]],
        Foo
      );
      spiedReflectDefine.mockReset();
    });
  });
});
