import { Module } from '@nestjs/common';
import { ApiRoomPresentationModule } from '@smart-home/api/room/presentation';
import { ApiDevicePresentationModule } from '@smart-home/api/device/presentation';
import { ApiScenePresentationModule } from '@smart-home/api/scene/presentation';
import {ApiAlarmPresentationModule} from "@smart-home/api/alarm/presentation";
import {ApiUsagePresentationModule} from "@smart-home/api/usage/presentation";

@Module({
  imports: [
    ApiRoomPresentationModule,
    ApiDevicePresentationModule,
    ApiScenePresentationModule,
    ApiAlarmPresentationModule,
    ApiUsagePresentationModule
  ],
})
export class ApiShellFeatureModule {}
