import { Module } from '@nestjs/common';
import { ApiRoomPresentationModule } from '@smart-home/api/room/presentation';
import { ApiDevicePresentationModule } from '@smart-home/api/device/presentation';
import { ApiScenePresentationModule } from '@smart-home/api/scene/presentation';
import {ApiAlarmPresentationModule} from "@smart-home/api/alarm/presentation";
import {ApiUsagePresentationModule} from "@smart-home/api/usage/presentation";
import {ApiHomePresentationModule} from "@smart-home/api/home/presentation";
import {ApiSharedAuthModule} from "@smart-home/api/shared/auth";
import {ApiUserPresentationModule} from "@smart-home/api/user/presentation";

@Module({
  imports: [
    ApiRoomPresentationModule,
    ApiDevicePresentationModule,
    ApiScenePresentationModule,
    ApiAlarmPresentationModule,
    ApiUsagePresentationModule,
    ApiHomePresentationModule,
    ApiSharedAuthModule,
    ApiUserPresentationModule
  ],
})
export class ApiShellFeatureModule {}
