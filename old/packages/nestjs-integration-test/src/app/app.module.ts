import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FooExtendModule } from './foo-extend/foo-extend.module';
import { FooModule } from './foo/foo.module';
import { AddressProfile } from './profiles/address.profile';
import { AvatarProfile } from './profiles/avatar.profile';
import { UserProfileProfile } from './profiles/user-profile.profile';
import { UserProfile } from './profiles/user.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [
        {
          name: 'classes',
          pluginInitializer: classes,
          namingConventions: new CamelCaseNamingConvention(),
        },
      ],
      singular: true,
    }),
    FooModule,
    FooExtendModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AddressProfile,
    AvatarProfile,
    UserProfileProfile,
    UserProfile,
  ],
})
export class AppModule {}
