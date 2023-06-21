import { Module } from '@nestjs/common';
import { SmartHubSceneController } from './smart-hub-scene.controller';
import { SmartHubSceneService } from './smart-hub-scene.service';
import {ControlDeviceService, SceneJobsService} from "@smart-home/smart-hub/common";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [SmartHubSceneController],
  providers: [SmartHubSceneService, SceneJobsService, ControlDeviceService],
  exports: [SmartHubSceneService],
})
export class SmartHubSceneModule {}
