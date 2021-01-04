import { setupClasses } from '../setup.spec';
import {
  NoMetadataBar,
  NoMetadataBarDto,
  NoMetadataFoo,
  NoMetadataFooDto,
} from './fixtures/models/no-metadata-foo-bar';

describe('No metadata', () => {
  const [mapper] = setupClasses('noMeta');

  it('should not throw', () => {
    expect(() => {
      mapper.createMap(NoMetadataBar, NoMetadataBarDto);
      mapper.createMap(NoMetadataFoo, NoMetadataFooDto);
    }).not.toThrow();
  });
});
