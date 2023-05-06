import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { ApiDeviceUseCasesModule } from '@smart-home/api/device/use-cases';

@Module({
  imports: [ApiDeviceUseCasesModule],
  controllers: [DeviceController],
})
export class ApiDevicePresentationModule {}
