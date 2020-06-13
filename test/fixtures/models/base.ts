import { AutoMap } from '../../../src/decorators';

export class Base {
  @AutoMap()
  createdDate?: Date;
  @AutoMap()
  updatedDate?: Date;
  @AutoMap()
  id?: string;
}

export class BaseVm {
  @AutoMap()
  created?: Date;
  @AutoMap()
  updated?: Date;
  @AutoMap()
  recordId?: string;
}

export abstract class AbstractBase {
  @AutoMap()
  createdDate?: Date;
  @AutoMap()
  updatedDate?: Date;
  @AutoMap()
  id?: string;
}

export abstract class AbstractBaseVm {
  @AutoMap()
  createdDate?: Date;
  @AutoMap()
  updatedDate?: Date;
  @AutoMap()
  id?: string;
}

export class NestedFooBase {
  @AutoMap()
  id?: string;
}

export class NestedFooVmBase {
  @AutoMap()
  id?: string;
}

export class FooBase {
  @AutoMap(() => NestedFooBase)
  nestedFooBase?: NestedFooBase;
  @AutoMap(() => NestedFooBase)
  nestedFooBases?: NestedFooBase[];
}

export class FooVmBase {
  @AutoMap(() => NestedFooVmBase)
  nestedFooBase?: NestedFooVmBase;
  @AutoMap(() => NestedFooVmBase)
  nestedFooBases?: NestedFooVmBase[];
}
