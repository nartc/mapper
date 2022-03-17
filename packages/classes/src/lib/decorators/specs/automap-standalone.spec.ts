import 'reflect-metadata';
import { AUTOMAP_STANDALONE_METADATA_KEY } from '../../keys';
import { AutoMapStandalone } from '../automap-standalone';

describe(AutoMapStandalone.name, () => {
    const spiedReflectDefine = jest.spyOn(Reflect, 'defineMetadata');

    it('should call defineMetadata to store constructors', () => {
        class Bar {}

        @AutoMapStandalone(Bar)
        class Foo {}

        expect(spiedReflectDefine).toHaveBeenCalledWith(
            AUTOMAP_STANDALONE_METADATA_KEY,
            [Bar],
            Foo
        );
        spiedReflectDefine.mockReset();
    });
});
