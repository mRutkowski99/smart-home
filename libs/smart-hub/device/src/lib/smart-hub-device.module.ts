import { Module } from '@nestjs/common';
import { SmartHubDeviceController } from './smart-hub-device.controller';
import { SmartHubDeviceService } from './smart-hub-device.service';

@Module({
  controllers: [SmartHubDeviceController],
  providers: [SmartHubDeviceService],
  exports: [SmartHubDeviceService],
})
export class SmartHubDeviceModule {}
