import { AutoMapper, ProfileBase } from '../../../src';
import { FooWithBase, FooWithBaseVm, Temp, TempVm } from '../models/foo';

export class FooProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(FooWithBase, FooWithBaseVm, {
        includeBase: [Temp, TempVm],
      })
      .reverseMap();
  }
}
