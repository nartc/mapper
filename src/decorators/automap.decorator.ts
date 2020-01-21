import {
  Expose,
  ExposeOptions,
  Type,
  TypeHelpOptions,
  TypeOptions,
} from 'class-transformer';

export type AutoMapDecoratorOptions = {
  exposeOptions?: ExposeOptions;
  typeOptions?: TypeOptions;
};

export const autoMap = (
  typeFn?: (type?: TypeHelpOptions) => Function,
  options: AutoMapDecoratorOptions = {}
): PropertyDecorator => (target: any, propertyKey) => {
  const { exposeOptions, typeOptions } = options;
  if (typeFn) {
    Expose(exposeOptions)(target, propertyKey as string);
    Type(typeFn, typeOptions)(target, propertyKey as string);
  } else {
    Expose(exposeOptions)(target, propertyKey as string);
  }
};
