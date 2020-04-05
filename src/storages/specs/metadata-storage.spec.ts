import { MetadataMapList } from '../../types';
import { metadataStorage } from '../metadata.storage';

describe('MetadataStorage', () => {
  // const metadataMap = [[]];
  const existingMetadataMap: MetadataMapList = [['foo', () => false]];

  class Foo {
    foo!: string;
  }

  it('addMetadata', () => {
    const spy = jest.spyOn(metadataStorage, 'addMetadata');
    metadataStorage.addMetadata(Foo, existingMetadataMap);
    expect(spy).toHaveBeenCalledWith(Foo, existingMetadataMap);
  });

  it('getMetadata', () => {
    const spy = jest.spyOn(metadataStorage, 'getMetadata');
    metadataStorage.addMetadata(Foo, existingMetadataMap);
    const result = metadataStorage.getMetadata(Foo);
    expect(result).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(Foo);
    expect(spy).toHaveReturnedWith([
      ...existingMetadataMap,
      ...existingMetadataMap,
    ]);
  });

  it('getMetadataForKey', () => {
    const spy = jest.spyOn(metadataStorage, 'getMetadataForKey');
    metadataStorage.addMetadata(Foo, existingMetadataMap);
    const result = metadataStorage.getMetadataForKey(Foo, 'foo');
    expect(result).toBeTruthy();
    expect(result?.[1]).toBeInstanceOf(Function);
    expect(result?.[1]()).toBe(false);
    expect(spy).toHaveBeenCalledWith(Foo, 'foo');
  });
});
