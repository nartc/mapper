import {
  Expose,
  ExposeOptions,
  Type,
  TypeHelpOptions,
  TypeOptions,
} from 'class-transformer';

/**
 * Combined Expose and Type from class-transformer
 *
 * @param {(type?: TypeHelpOptions) => Function} typeFn
 * @param {ExposeOptions} exposeOptions
 * @param {TypeOptions} typeOptions
 */
export const ExposedType = (
  typeFn: (type?: TypeHelpOptions) => Function,
  exposeOptions?: ExposeOptions,
  typeOptions?: TypeOptions
): PropertyDecorator => (target: any, propertyKey) => {
  Expose(exposeOptions)(target, propertyKey as string);
  Type(typeFn, typeOptions)(target, propertyKey as string);
};
