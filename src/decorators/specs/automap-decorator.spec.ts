import { metadataStorage } from '../../storages';
import { AutoMap } from '../automap.decorator';

describe('AutoMap decorator', () => {
  it('should call metadataStorage.addMetadata', () => {
    const metadata: any[] = [];
    const spy = jest
      .spyOn(metadataStorage, 'addMetadata')
      .mockImplementation((target: any, meta: any) => {
        const index = metadata.findIndex(
          m => m.key === target.prototype.constructor.name
        );

        if (index !== -1) {
          metadata[index].meta.push(...meta);
        } else {
          metadata.push({ key: target.prototype.constructor.name, meta });
        }
      });

    class Bar {
      @AutoMap()
      foo!: string;
      @AutoMap()
      day!: Date;
    }

    class Foo {
      @AutoMap()
      foo!: string;
      @AutoMap()
      bar!: number;
      @AutoMap()
      baz!: boolean;
      @AutoMap(() => Bar)
      barBar!: Bar;
    }

    expect(metadata).toHaveLength(2);
    expect(spy).toHaveBeenCalledTimes(6);
    const fooMeta = metadata.find(m => m.key === Foo.name);
    expect(fooMeta).toBeTruthy();
    expect(fooMeta.meta).toHaveLength(4);
    const barMeta = metadata.find(m => m.key === Bar.name);
    expect(barMeta).toBeTruthy();
    expect(barMeta.meta).toHaveLength(2);
  });
});
