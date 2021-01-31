import { createMetadataMap } from '@automapper/pojos';

export interface PascalAvatar {
  Url: string;
  Source: string;
  ShouldIgnore: number;
  ShouldBeSubstituted: string | null;
  ForCondition: boolean;
}

export interface PascalAvatarVm {
  Url: string;
  WillBeIgnored: number;
  ShouldBeSubstituted: string | null;
  ForCondition: boolean;
}

export function createAvatarPascalMetadata() {
  createMetadataMap('PascalAvatar', {
    Url: String,
    Source: String,
    ShouldIgnore: Number,
    ShouldBeSubstituted: String,
    ForCondition: Boolean,
  });

  createMetadataMap('PascalAvatarVm', 'PascalAvatar', {
    Source: null,
    ShouldIgnore: null,
    WillBeIgnored: Number,
  });
}
