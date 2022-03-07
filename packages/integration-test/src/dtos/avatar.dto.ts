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
