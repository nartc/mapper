import * as Actual from '../src/lib/automap';
import * as Shim from './index';

describe('Classes - Shim', () => {
    it('should contains all decorators exported by classes package', () => {
        const actualExportNames = Object.keys(Actual).sort();
        const shimExportNames = Object.keys(Shim).sort();

        expect(shimExportNames).toEqual(actualExportNames);
    });
});
