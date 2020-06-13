import { AutoMapper, mapFrom, ProfileBase } from '../../../src';
import { Base, BaseVm, FooBase, FooVmBase, NestedFooBase, NestedFooVmBase } from '../models/base';

export class BaseProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(Base, BaseVm)
      .forMember(
        d => d.created,
        mapFrom(s => s.createdDate)
      )
      .forMember(
        d => d.updated,
        mapFrom(s => s.updatedDate)
      )
      .forMember(
        d => d.recordId,
        mapFrom(s => s.id)
      )
      .reverseMap();

    mapper.createMap(NestedFooBase, NestedFooVmBase);
    mapper.createMap(FooBase, FooVmBase);
  }
}
