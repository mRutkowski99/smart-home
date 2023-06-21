import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SmartHubDeviceModule} from "@smart-home/smart-hub/device";
import {SmartHubSceneModule} from "@smart-home/smart-hub/scene";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [SmartHubDeviceModule, SmartHubSceneModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
