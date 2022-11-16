import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { DeviceSchemFactory } from './device-schema.factory';
import { DeviceRepository } from './device.repository';

@Module({
  imports: [PrismaServiceModule],
  providers: [DeviceRepository, DeviceSchemFactory],
  exports: [DeviceRepository, DeviceSchemFactory],
})
export class DevicesInfrastructureModule {}
