import { createMetadataMap } from '@automapper/pojos';

export interface CustomKeyBar {
  '.startDot': string | null
}

export interface CustomKeyBarVm {
  '.startDot': string | null;
}

export interface CustomKeyFoo {
  '.startDot': string;
  'mid.Dot': CustomKeyBar;
  'endDot.': number | null;
  normalKey: string
}

export interface CustomKeyFooVm {
  '.startDot': string;
  'mid.Dot': CustomKeyBarVm;
  'endDot.': number | null;
  normalKey: string
}

export function createCustomKeyFooMetadata() {
  createMetadataMap('CustomKeyBar', {
    '.startDot': String,
  });

  createMetadataMap('CustomKeyBarVm', {
    '.startDot': String,
  });

  createMetadataMap('CustomKeyFoo', {
    '.startDot': String,
    'mid.Dot': 'CustomKeyBar',
    'endDot.': Number,
    normalKey: String,
  });

  createMetadataMap('CustomKeyFooVm', {
    '.startDot': String,
    'mid.Dot': 'CustomKeyBarVm',
    'endDot.': Number,
    normalKey: String,
  });
}
