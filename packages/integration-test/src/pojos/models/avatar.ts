import { PojosMetadataMap } from '@automapper/pojos';

export interface Avatar {
    url: string;
    source: string;
    shouldIgnore: number;
    shouldBeSubstituted: string | null;
    forCondition: boolean;
}

export interface PascalAvatar {
    Url: string;
    Source: string;
    ShouldIgnore: number;
    ShouldBeSubstituted: string | null;
    ForCondition: boolean;
}

export interface SnakeAvatar {
    url: string;
    source: string;
    should_ignore: number;
    should_be_substituted: string | null;
    for_condition: boolean;
}

export function createAvatarMetadata() {
    PojosMetadataMap.create<Avatar>('Avatar', {
        url: String,
        source: String,
        shouldIgnore: Number,
        shouldBeSubstituted: String,
        forCondition: Boolean,
    });

    PojosMetadataMap.create<PascalAvatar>('PascalAvatar', {
        Url: String,
        Source: String,
        ShouldIgnore: Number,
        ShouldBeSubstituted: String,
        ForCondition: Boolean,
    });

    PojosMetadataMap.create<SnakeAvatar>('SnakeAvatar', {
        url: String,
        source: String,
        should_ignore: Number,
        should_be_substituted: String,
        for_condition: Boolean,
    });
}
