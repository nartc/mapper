import { MappingProfile } from '@automapper/types';
import { setupPojos } from '../setup.spec';
import type {
  SimpleBar,
  SimpleBarVm,
  SimpleFoo,
  SimpleFooVm,
} from './fixtures/interfaces/simple-foo-bar.interface';
import { createSimpleFooBarMetadata } from './fixtures/interfaces/simple-foo-bar.interface';

describe('Creation', () => {
  const [mapper, spiedErrorHandler] = setupPojos('creation');

  it('should create mapper', () => {
    expect(mapper).toBeTruthy();
  });

  it('should create mapping', () => {
    createSimpleFooBarMetadata();

    expect(mapper.getMapping('SimpleBar', 'SimpleBarVm')).toBeUndefined();
    expect(mapper.getMapping('SimpleFoo', 'SimpleFooVm')).toBeUndefined();

    expect(spiedErrorHandler).toHaveBeenCalledTimes(2);

    mapper.createMap<SimpleBar, SimpleBarVm>('SimpleBar', 'SimpleBarVm');
    mapper.createMap<SimpleFoo, SimpleFooVm>('SimpleFoo', 'SimpleFooVm');

    expect(mapper.getMapping('SimpleBar', 'SimpleBarVm')).toBeTruthy();
    expect(mapper.getMapping('SimpleFoo', 'SimpleFooVm')).toBeTruthy();
  });

  it('should throw when creating duplicate mapping', () => {
    createSimpleFooBarMetadata();

    mapper.createMap('SimpleBar', 'SimpleBarVm');
    expect(mapper.getMapping('SimpleBar', 'SimpleBarVm')).toBeTruthy();

    mapper.createMap('SimpleBar', 'SimpleBarVm');
    expect(spiedErrorHandler).toHaveBeenNthCalledWith(
      1,
      `Mapping for source SimpleBar and destination SimpleBarVm already exists`
    );
  });

  it('should add profile', () => {
    const profile: MappingProfile = (_mapper) => {
      createSimpleFooBarMetadata();
      _mapper.createMap('SimpleBar', 'SimpleBarVm');
      _mapper.createMap('SimpleFoo', 'SimpleFooVm');
    };

    mapper.addProfile(profile);

    expect(mapper.getMapping('SimpleBar', 'SimpleBarVm')).toBeTruthy();
    expect(mapper.getMapping('SimpleFoo', 'SimpleFooVm')).toBeTruthy();
  });
});
