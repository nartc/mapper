import { AutoMap } from '@automapper/classes';

export class NestedOptionalClass {
  @AutoMap()
  name?: string;

  public getFullName(): string {
    return this.name;
  }
}

export class Source {
  @AutoMap()
  description?: string;
  @AutoMap({ typeFn: () => NestedOptionalClass })
  options?: NestedOptionalClass;
}

export class SourceChild extends Source {
  @AutoMap()
  another?: string;
}

export class Destination {
  @AutoMap()
  description?: string;
  @AutoMap({ typeFn: () => NestedOptionalClass })
  options?: NestedOptionalClass;
}

export class DestinationChild extends Destination {
  @AutoMap()
  another?: string;
}
