import { createMetadataMap } from '@automapper/pojos';

export interface SnakeAvatar {
  url: string;
  source: string;
  should_ignore: number;
  should_be_substituted: string;
  for_condition: boolean;
}

export interface SnakeAvatarVm {
  url: string;
  will_be_ignored: number;
  should_be_substituted: string;
  for_condition: boolean;
}

export function createAvatarSnakeMetadata() {
  createMetadataMap('SnakeAvatar', {
    url: String,
    source: String,
    should_ignore: Number,
    should_be_substituted: String,
    for_condition: Boolean,
  });

  createMetadataMap('SnakeAvatarVm', 'SnakeAvatar', {
    source: false,
    should_ignore: false,
    will_be_ignored: Number,
  });
}
