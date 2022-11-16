import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { DeviceRepository } from './device.repository';

@Module({
  imports: [PrismaServiceModule],
  providers: [DeviceRepository],
  exports: [DeviceRepository],
})
export class DevicesInfrastructureModule {}
