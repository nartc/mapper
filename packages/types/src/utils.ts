export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: unknown[]) => infer U
  ? U
  : T extends new (...args: unknown[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;
export type Dictionary<T> = { [key in keyof T]?: unknown };
export type Fn<T> = () => T;

export interface Selector<
  TObject extends Dictionary<TObject> = unknown,
  TReturnType = unknown
> {
  (obj: TObject): TReturnType;
}

export type SelectorReturn<TObject extends Dictionary<TObject>> = ReturnType<
  Selector<TObject>
>;

export interface ValueSelector<
  TSource extends Dictionary<TSource> = unknown,
  TDestination extends Dictionary<TDestination> = unknown,
  TValueReturn = SelectorReturn<TDestination>
> {
  (source: TSource): TValueReturn;
}

export interface TransformerMetadataFactory<
  TModel extends Dictionary<TModel> = unknown
> {
  __NARTC_AUTOMAPPER_METADATA_FACTORY?: () => Dictionary<TModel>;
}
