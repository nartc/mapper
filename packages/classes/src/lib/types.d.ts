import { Dictionary, TransformerMetadataFactory } from '@automapper/types';

export interface Constructible<TModel extends Dictionary<TModel> = unknown>
  extends TransformerMetadataFactory<TModel> {
  new (...args: unknown[]): TModel;
}
