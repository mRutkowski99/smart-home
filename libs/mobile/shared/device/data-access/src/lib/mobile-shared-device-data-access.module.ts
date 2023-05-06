import { NgModule } from '@angular/core';
import { DeviceApiService } from './api/device-api.service';

@NgModule({
  providers: [DeviceApiService],
})
export class MobileSharedDeviceDataAccessModule {}
