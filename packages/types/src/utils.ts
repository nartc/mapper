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

export type Primitive = String | Number | Boolean;

export type PrimitiveWithDate = Primitive | Date;

export type PrimitiveConstructor =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor;

export type PrimitiveConstructorWithDate =
  | PrimitiveConstructor
  | DateConstructor;

export interface Selector<
  TObject extends Dictionary<TObject> = any,
  TReturnType = unknown
> {
  (obj: TObject): TReturnType;
}

export type SelectorReturn<TObject extends Dictionary<TObject>> = ReturnType<
  Selector<TObject>
>;

export interface ValueSelector<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TValueReturn = SelectorReturn<TDestination>
> {
  (source: TSource): TValueReturn;
}

export interface TransformerMetadataFactory<
  TModel extends Dictionary<TModel> = any
> {
  __NARTC_AUTOMAPPER_METADATA_FACTORY?: () => Dictionary<TModel>;
}
