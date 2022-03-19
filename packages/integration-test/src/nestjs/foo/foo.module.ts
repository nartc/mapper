import { Module } from '@nestjs/common';
import { FooProfile } from './foo.profile';

@Module({ providers: [FooProfile] })
export class FooModule {}
