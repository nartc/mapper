import { User, UserVm } from '../../../test/fixtures/models/user';
import { mappingStorage } from '../mapping.storage';

describe('MappingStorage', () => {
  afterEach(() => {
    mappingStorage.dispose();
  });

  it('set', () => {
    const spy = jest.spyOn(mappingStorage, 'set');
    const mapping = [] as any;
    mappingStorage.set(User, UserVm, mapping);
    expect(spy).toHaveBeenCalledWith(User, UserVm, mapping);
  });

  it('get', () => {
    const spy = jest.spyOn(mappingStorage, 'get');
    mappingStorage.set(User, UserVm, [] as any);
    const result = mappingStorage.get(User, UserVm);
    expect(result).toBeTruthy();
    expect(result).toEqual([]);
    expect(spy).toHaveBeenCalledWith(User, UserVm);
    expect(spy).toHaveReturnedWith([]);
  });

  it('get without set', () => {
    const spy = jest.spyOn(mappingStorage, 'get');
    const result = mappingStorage.get(User, UserVm);
    expect(result).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(User, UserVm);
    expect(spy).toHaveReturnedWith(undefined);
  });

  it('has', () => {
    const spy = jest.spyOn(mappingStorage, 'has');
    mappingStorage.set(User, UserVm, [] as any);
    const result = mappingStorage.has(User, UserVm);
    expect(result).toBe(true);
    expect(spy).toHaveBeenCalledWith(User, UserVm);
    expect(spy).toHaveReturnedWith(true);
  });

  it('has without set', () => {
    const spy = jest.spyOn(mappingStorage, 'has');
    const result = mappingStorage.has(User, UserVm);
    expect(result).toBe(false);
    expect(spy).toHaveBeenCalledWith(User, UserVm);
    expect(spy).toHaveReturnedWith(false);
  });

  it('dispose', () => {
    const spy = jest.spyOn(mappingStorage, 'dispose');
    mappingStorage.set(User, UserVm, [] as any);
    let result = mappingStorage.get(User, UserVm);
    expect(result).toEqual([]);
    mappingStorage.dispose();
    result = mappingStorage.get(User, UserVm);
    expect(result).toBeUndefined();
    expect(spy).toHaveBeenCalled();
  });
});
