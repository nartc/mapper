import {
  CustomKeyBar,
  CustomKeyFoo,
} from '../fixtures/interfaces/custom-keys.interface';

export function getCustomKeyFoo(
  partials: {
    foo?: Partial<CustomKeyFoo>;
    bar?: Partial<CustomKeyBar>;
  } = {}
) {
  const bar: CustomKeyBar = {
    '.startDot': 'Internet',
    ...(partials.bar ?? {}),
  };

  return {
    '.startDot': 'Chau',
    'mid.Dot': bar,
    'endDot.': 5,
    ...(partials.foo ?? {}),
  } as CustomKeyFoo;
}
