import type { Dictionary, TransformerMetadataFactory } from '@automapper/types';

export interface Constructible<TModel extends Dictionary<TModel> = any>
  extends TransformerMetadataFactory<TModel> {
  new (...args: any[]): TModel;
}
