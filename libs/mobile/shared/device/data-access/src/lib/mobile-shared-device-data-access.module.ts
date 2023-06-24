import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {deviceReducer, SHARED_DEVICE_FEATURE_KEY} from "./state/device.reducer";
import {EffectsModule} from "@ngrx/effects";
import {DeviceEffects} from "./state/device.effects";
import {DeviceApiService} from "./api/device-api.service";
import {SharedDeviceFacade} from "./device.facade";

@NgModule({
  imports: [StoreModule.forFeature(SHARED_DEVICE_FEATURE_KEY, deviceReducer), EffectsModule.forFeature([DeviceEffects])],
  providers: [DeviceApiService, SharedDeviceFacade]
})
export class MobileSharedDeviceDataAccessModule {}
