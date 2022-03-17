import { AutoMap } from '@automapper/classes';

export class AvatarDto {
    @AutoMap()
    url!: string;
    @AutoMap()
    willBeIgnored!: number;
    @AutoMap(() => String)
    shouldBeSubstituted!: string | null;
    @AutoMap()
    forCondition!: boolean;
}

export class PascalAvatarDto {
    @AutoMap()
    Url!: string;
    @AutoMap()
    WillBeIgnored!: number;
    @AutoMap(() => String)
    ShouldBeSubstituted!: string | null;
    @AutoMap()
    ForCondition!: boolean;
}
export class SnakeAvatarDto {
    @AutoMap()
    url!: string;
    @AutoMap()
    will_be_ignored!: number;
    @AutoMap(() => String)
    should_be_substituted!: string | null;
    @AutoMap()
    for_condition!: boolean;
}
