import type { Constructible } from '@automapper/classes';
import { classes } from '@automapper/classes';
import type { Dictionary, MapPluginInitializer } from '@automapper/types';
import type { Model } from 'sequelize';
import { SequelizeInitializerOptions } from './types';

export const sequelize: (
  options?: SequelizeInitializerOptions
) => MapPluginInitializer<Constructible> = ({
  valueGetter,
  init,
}: SequelizeInitializerOptions = {}) => (errorHandler) => {
  const originalClasses = classes(errorHandler);

  return {
    ...originalClasses,
    instantiate<TInstanceModel extends Dictionary<TInstanceModel> = any>(
      model: any,
      obj?: TInstanceModel
    ) {
      const original = originalClasses.instantiate(model, obj);
      const instance = (original[0] as unknown) as Model;
      original[0] = (valueGetter
        ? valueGetter(instance)
        : instance.get
        ? instance.get()
        : instance) as TInstanceModel;
      return original;
    },
    postMap<TModel extends Dictionary<TModel> = any>(
      destination: Constructible<TModel>,
      destinationObj?: TModel
    ): TModel {
      const isSequelizeModel = 'sequelize' in destination;
      if (isSequelizeModel) {
        if (init) {
          return init((destination as unknown) as Model, destinationObj);
        }
        return new destination(destinationObj);
      }

      return destinationObj;
    },
  };
};
