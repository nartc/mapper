import { createMetadataMap } from '@automapper/pojos';

export interface Avatar {
  url: string;
  source: string;
  shouldIgnore: number;
  shouldBeSubstituted: string;
  forCondition: boolean;
}

export interface AvatarVm {
  url: string;
  willBeIgnored: number;
  shouldBeSubstituted: string;
  forCondition: boolean;
}

export function createAvatarMetadata() {
  createMetadataMap('Avatar', {
    url: String,
    source: String,
    shouldIgnore: Number,
    shouldBeSubstituted: String,
    forCondition: Boolean,
  });

  createMetadataMap('AvatarVm', 'Avatar', {
    source: null,
    shouldIgnore: null,
    willBeIgnored: Number,
  });
}
