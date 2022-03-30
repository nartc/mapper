import { PojosMetadataMap } from '@automapper/pojos';

export interface AvatarDto {
    url: string;
    willBeIgnored: number;
    shouldBeSubstituted: string | null;
    forCondition: boolean;
}

export interface PascalAvatarDto {
    Url: string;
    WillBeIgnored: number;
    ShouldBeSubstituted: string | null;
    ForCondition: boolean;
}
export interface SnakeAvatarDto {
    url: string;
    will_be_ignored: number;
    should_be_substituted: string | null;
    for_condition: boolean;
}

export function createAvatarDtoMetadata() {
    PojosMetadataMap.create<AvatarDto>('AvatarDto', {
        url: String,
        forCondition: Boolean,
        shouldBeSubstituted: String,
        willBeIgnored: Number,
    });

    PojosMetadataMap.create<PascalAvatarDto>('PascalAvatarDto', {
        Url: String,
        ForCondition: Boolean,
        ShouldBeSubstituted: String,
        WillBeIgnored: Number,
    });

    PojosMetadataMap.create<SnakeAvatarDto>('SnakeAvatarDto', {
        url: String,
        for_condition: Boolean,
        should_be_substituted: String,
        will_be_ignored: Number,
    });
}
