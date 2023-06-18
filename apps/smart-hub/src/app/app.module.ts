import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SmartHubDeviceModule} from "@smart-home/smart-hub/device";

@Module({
  imports: [SmartHubDeviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
