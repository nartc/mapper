import { AutoMap } from '@automapper/classes';

export class Avatar {
    @AutoMap()
    url!: string;
    @AutoMap()
    source!: string;
    @AutoMap()
    shouldIgnore!: number;
    @AutoMap(() => String)
    shouldBeSubstituted!: string | null;
    @AutoMap()
    forCondition!: boolean;
}

export class PascalAvatar {
    @AutoMap()
    Url!: string;
    @AutoMap()
    Source!: string;
    @AutoMap()
    ShouldIgnore!: number;
    @AutoMap(() => String)
    ShouldBeSubstituted!: string | null;
    @AutoMap()
    ForCondition!: boolean;
}

export class SnakeAvatar {
    @AutoMap()
    url!: string;
    @AutoMap()
    source!: string;
    @AutoMap()
    should_ignore!: number;
    @AutoMap(() => String)
    should_be_substituted!: string | null;
    @AutoMap()
    for_condition!: boolean;
}
