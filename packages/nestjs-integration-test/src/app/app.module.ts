import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressProfile } from './profiles/address.profile';
import { AvatarProfile } from './profiles/avatar.profile';
import { FooProfile } from './profiles/foo.profile';
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AddressProfile,
    AvatarProfile,
    UserProfileProfile,
    UserProfile,
    FooProfile,
  ],
})
export class AppModule {}
