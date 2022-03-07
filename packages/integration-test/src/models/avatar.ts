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
