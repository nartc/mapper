import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressProfile } from './profiles/address.profile';
import { AvatarProfile } from './profiles/avatar.profile';
import { UserProfileProfile } from './profiles/user-profile.profile';
import { UserProfile } from './profiles/user.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [{ name: 'classes', pluginInitializer: classes }],
      singular: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AvatarProfile,
    AddressProfile,
    UserProfileProfile,
    UserProfile,
  ],
})
export class AppModule {}
