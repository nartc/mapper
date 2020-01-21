import { ExposeOptions, TypeHelpOptions, TypeOptions } from 'class-transformer';
import { AutoMap } from './automap.decorator';

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
  console.warn('ExposedType is being deprecated. Please use @autoMap instead');
  AutoMap(typeFn, { exposeOptions, typeOptions })(target, propertyKey);
};
