import { AutoMap } from '@automapper/classes';
import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Foo extends BaseEntity<Foo, 'id'> {
  @PrimaryKey()
  @AutoMap()
  id!: number;

  @Property()
  @AutoMap()
  foo!: string;
}

export class FooDto {
  @AutoMap()
  id!: number;
  @AutoMap()
  foo!: string;
}
