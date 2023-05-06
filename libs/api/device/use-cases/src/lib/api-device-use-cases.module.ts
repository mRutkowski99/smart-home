import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiDeviceInfrastructureModule } from '@smart-home/api/device/infrastructure';
import { UpdateSetpointHandler } from './commands/update-setpoint';
import { UpdateStateHandler } from './commands/update-state';

@Module({
  imports: [CqrsModule, ApiDeviceInfrastructureModule],
  providers: [UpdateSetpointHandler, UpdateStateHandler],
  exports: [CqrsModule],
})
export class ApiDeviceUseCasesModule {}
