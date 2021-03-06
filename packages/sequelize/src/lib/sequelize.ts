import type { Constructible } from '@automapper/classes';
import { classes } from '@automapper/classes';
import type { Dictionary, MapPluginInitializer } from '@automapper/types';
import type { Model } from 'sequelize';

export const sequelize: <
  TGetterResult extends Record<string, unknown> = any,
  TModel extends Model<TGetterResult> = Model<TGetterResult>
>(
  valueGetter?: (model: TModel) => TGetterResult
) => MapPluginInitializer<Constructible> = <
  TGetterResult extends Record<string, unknown> = any,
  TModel extends Model<TGetterResult> = Model<TGetterResult>
>(
  valueGetter?: (model: TModel) => TGetterResult
) => (errorHandler) => {
  const originalClasses = classes(errorHandler);

  return {
    ...originalClasses,
    instantiate<TInstanceModel extends Dictionary<TInstanceModel> = any>(
      model: any,
      obj?: TInstanceModel
    ) {
      const original = originalClasses.instantiate(model, obj);
      const instance = (original[0] as unknown) as TModel;
      original[0] = (valueGetter
        ? valueGetter(instance)
        : instance.get
        ? instance.get()
        : instance) as TInstanceModel;
      return original;
    },
  };
};
