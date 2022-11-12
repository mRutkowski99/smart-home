import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SafetyInfrastructureModule } from '@smart-home/api/safety/infrastructure';
import { GetSafetyByHomeHandler, GetSafetyWithLogsHandler } from './queries';

@Module({
  imports: [CqrsModule, SafetyInfrastructureModule],
  providers: [GetSafetyByHomeHandler, GetSafetyWithLogsHandler],
  exports: [CqrsModule],
})
export class SafetyCqrsModule {}
