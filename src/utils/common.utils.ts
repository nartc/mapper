import {
  Dict,
  ForMemberExpression,
  MapFromCallback,
  NamingConvention,
  Resolver,
  Selector,
  TransformationType,
} from '../types';

/**
 * Internal method
 * @private
 */
export function _getTransformationType(
  forMemberFn: ForMemberExpression
): { withPreCondition: boolean; type: TransformationType } {
  const fnString = forMemberFn.toString();
  const type = _getTransformationTypeWithoutPre(fnString);
  return { withPreCondition: fnString.includes('preCondition'), type };
}

function _getTransformationTypeWithoutPre(
  fnString: string
): TransformationType {
  if (fnString.includes('condition')) {
    return TransformationType.Condition;
  }

  if (fnString.includes('fromValue')) {
    return TransformationType.FromValue;
  }

  if (fnString.includes('mapWith')) {
    return TransformationType.MapWith;
  }

  if (fnString.includes('convertUsing')) {
    return TransformationType.ConvertUsing;
  }

  if (fnString.includes('mapFrom')) {
    return TransformationType.MapFrom;
  }

  if (fnString.includes('nullSubstitution')) {
    return TransformationType.NullSubstituion;
  }

  return TransformationType.Ignore;
}

/**
 * Internal method
 * @private
 */
export function _getPathRecursive(node: any, prefix: string = ''): string[] {
  if (typeof node !== 'object' || node === null) {
    return [];
  }

  const result: string[] = [];
  for (const key in node) {
    const path = prefix + key;
    result.push(path);
    const child = node[key];
    if (_isObjectLike(child)) {
      let queue = [child];
      if (Array.isArray(child)) {
        queue = child;
      }

      for (const childNode of queue) {
        result.push(..._getPathRecursive(childNode, path + '.'));
      }
    }
  }

  return result;
}

/**
 * Internal method
 * @private
 */
export function _isObjectLike(obj: any): boolean {
  return obj !== null && obj !== undefined && typeof obj === 'object';
}

/**
 * Internal method
 * @private
 */
export function _getMappingKey(
  sourceKey: string,
  destinationKey: string
): string {
  return sourceKey + '->' + destinationKey;
}

/**
 * Internal method
 * @private
 */
export function _isNestedPath(path: string): boolean {
  return path.split('.').length > 1;
}

/**
 * Internal method
 * @private
 */
export function _getMemberPath(fn: Selector): string {
  const fnString = fn.toString();
  return _isArrowFn(fnString)
    ? _getPath(_removeExtraForArrow(fnString))
    : _getPath(_removeExtraForFunction(fnString));
}

function _isArrowFn(fnString: string): boolean {
  return /^[^{]+?=>/gm.test(fnString);
}

function _removeExtraForArrow(fnString: string): string[] {
  return fnString.replace(/(?:\s|return|{|}|\(|\)|)+/gm, '').split('=>');
}

function _removeExtraForFunction(fnString: string): string[] {
  return fnString
    .replace(/(?:\s|function|;|{|}|\(|\)|)+/gm, '')
    .split('return');
}

function _getPath(fnParts: string[]): string {
  // @ts-ignore
  return fnParts
    .join('')
    .split(new RegExp(`${fnParts[0]}\\.{1}`, 'g'))
    .filter(Boolean)
    .pop();
}

/**
 * Internal method
 * @private
 */
export function _getSourcePropertyKey(
  destinationMemberNamingConvention: NamingConvention,
  sourceMemberNamingConvention: NamingConvention,
  path: string
): string {
  if (_isNestedPath(path)) {
    return path
      .split('.')
      .map(key =>
        _getSourcePropertyKey(
          destinationMemberNamingConvention,
          sourceMemberNamingConvention,
          key
        )
      )
      .join('.');
  }

  const keyParts = path
    .split(destinationMemberNamingConvention.splittingExpression)
    .filter(Boolean);
  return !keyParts.length
    ? path
    : sourceMemberNamingConvention.transformPropertyName(keyParts);
}

/**
 * Internal method
 * @private
 */
export function _isClass(val: Function | Object): boolean {
  return (
    val.constructor &&
    (/^\s*function/.test(val.constructor.toString()) ||
      /^\s*class/.test(val.constructor.toString())) &&
    val.constructor.toString().includes(val.constructor.name)
  );
}

/**
 * Internal method
 * @private
 */
export function _isResolver<TSource>(
  fn: MapFromCallback<TSource>
): fn is Resolver {
  return 'resolve' in fn;
}

/**
 * Internal method
 * @private
 */
export function _assertMappingErrors<T extends Dict<T> = any>(
  obj: T,
  propKeys: Array<string>
): void {
  const keys = Object.keys(obj);
  const unmappedKeys: string[] = [];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (propKeys.includes(key)) {
      continue;
    }
    unmappedKeys.push(key);
  }

  if (unmappedKeys.length) {
    throw new Error(`The following keys are unmapped on ${obj.constructor
      .name || ''}:
      ----------------------------
      ${unmappedKeys.join('\n')}
      `);
  }
}

export enum ObjectTag {
  Undefined = '[object Undefined]',
  Null = '[object Null]',
  Object = '[object Object]',
  Array = '[object Array]',
  Date = '[object Date]',
  Map = '[object Map]',
}

function _getTag(value: any): string {
  if (value == null) {
    return value === undefined ? ObjectTag.Undefined : ObjectTag.Null;
  }

  return Object.prototype.toString.call(value) as ObjectTag;
}

export function _get<T>(object: T, path: string, defaultVal: any = null): any {
  const _path = path.split('.').filter(Boolean);
  const _val = _path.reduce((obj: any, key) => obj && obj[key], object);
  return _val === undefined ? defaultVal : _val;
}

export function _isEmpty(value: any): boolean {
  const tag = _getTag(value);
  if (tag === ObjectTag.Map) {
    return !value.size;
  }

  if (tag === ObjectTag.Object) {
    return !Object.keys(value).length;
  }

  if (tag === ObjectTag.Array) {
    return !value.length;
  }

  return !value;
}

export function _isDate(value: any): boolean {
  return _getTag(value) === ObjectTag.Date;
}
