import { MappingProfile } from '@automapper/types';
import { setupClasses } from '../setup.spec';
import {
  SimpleBar,
  SimpleBarVm,
  SimpleFoo,
  SimpleFooVm,
} from './fixtures/models/simple-foo-bar';

describe('Creation', () => {
  const [mapper, spiedErrorHandler] = setupClasses('creation');

  it('should create mapper', () => {
    expect(mapper).toBeTruthy();
  });

  it('should create mapping', () => {
    expect(mapper.getMapping(SimpleBar, SimpleBarVm)).toBeUndefined();
    expect(mapper.getMapping(SimpleFoo, SimpleFooVm)).toBeUndefined();

    expect(spiedErrorHandler).toHaveBeenCalledTimes(2);

    mapper.createMap(SimpleBar, SimpleBarVm);
    mapper.createMap(SimpleFoo, SimpleFooVm);

    expect(mapper.getMapping(SimpleBar, SimpleBarVm)).toBeTruthy();
    expect(mapper.getMapping(SimpleFoo, SimpleFooVm)).toBeTruthy();
  });

  it('should throw when creating duplicate mapping', () => {
    mapper.createMap(SimpleBar, SimpleBarVm);
    expect(mapper.getMapping(SimpleBar, SimpleBarVm)).toBeTruthy();

    mapper.createMap(SimpleBar, SimpleBarVm);
    expect(spiedErrorHandler).toHaveBeenNthCalledWith(
      1,
      `Mapping for source ${SimpleBar.toString()} and destination ${SimpleBarVm.toString()} already exists`
    );
  });

  it('should add profile', () => {
    const profile: MappingProfile = (_mapper) => {
      _mapper.createMap(SimpleBar, SimpleBarVm);
      _mapper.createMap(SimpleFoo, SimpleFooVm);
    };

    mapper.addProfile(profile);

    expect(mapper.getMapping(SimpleBar, SimpleBarVm)).toBeTruthy();
    expect(mapper.getMapping(SimpleFoo, SimpleFooVm)).toBeTruthy();
  });
});
