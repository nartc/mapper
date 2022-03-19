import { Module } from '@nestjs/common';
import { FooExtendController } from './foo-extend.controller';
import { FooExtendProfile } from './foo-extend.profile';

@Module({
    controllers: [FooExtendController],
    providers: [FooExtendProfile],
})
export class FooExtendModule {}
