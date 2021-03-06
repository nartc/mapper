import type { Dictionary } from '@automapper/types';
import type { Model } from 'sequelize';

export interface SequelizeInitializerOptions {
  valueGetter?: <
    TGetterResult extends Record<string, unknown> = any,
    TModel extends Model<TGetterResult> = Model<TGetterResult>
  >(
    model: TModel
  ) => TGetterResult;
  init?: <
    TDestination extends Dictionary<TDestination> = any,
    TModel extends Model<TDestination> = Model<TDestination>
  >(
    destination: TModel,
    destinationObj: TDestination
  ) => TDestination;
}
