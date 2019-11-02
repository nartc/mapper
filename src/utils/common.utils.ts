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
export function _isClass(fn: Function): boolean {
  return (
    fn.constructor &&
    (/^\s*function/.test(fn.constructor.toString()) ||
      /^\s*class/.test(fn.constructor.toString())) &&
    fn.constructor.toString().includes(fn.constructor.name)
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
    (obj[key as keyof T] === null || obj[key as keyof T] === undefined) &&
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
