import { setupClasses } from '../setup.spec';
import { typeConverterProfile } from './fixtures/profiles/type-converter.profile';
import {
  TypeConverterDestination,
  TypeConverterSource,
} from './fixtures/models/type-converter';

describe('Map - TypeConverter', () => {
  const [mapper] = setupClasses('typeConveterMapper');

  it('should map correctly', () => {
    mapper.addProfile(typeConverterProfile);

    const source = new TypeConverterSource();
    source.value1 = '123';
    source.value2 = '10/14/1991';
    source.value3 = 'truthy';

    const destination = mapper.map(
      source,
      TypeConverterDestination,
      TypeConverterSource
    );
    expect(destination.value1).toEqual(123);
    expect(destination.value2).toEqual(new Date(source.value2));
    expect(destination.value3).toEqual(true);
  });
});
