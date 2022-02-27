import * as Shim from './shim';
import * as Actual from '../src/lib/decorators';

describe('Shim file', () => {
  it('should contains all decorators exported by classes package', () => {
    const actualExportNames = Object.keys(Actual).sort();
    const shimExportNames = Object.keys(Shim).sort();

    expect(shimExportNames).toEqual(actualExportNames);
  });
});
