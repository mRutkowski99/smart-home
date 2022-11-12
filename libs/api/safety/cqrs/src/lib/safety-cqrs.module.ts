import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SafetyInfrastructureModule } from '@smart-home/api/safety/infrastructure';
import { ConfirmSafetyLogHandler, CreateSafetyLogHandler } from './commands';
import { GetSafetyByHomeHandler, GetSafetyWithLogsHandler } from './queries';

@Module({
  imports: [CqrsModule, SafetyInfrastructureModule],
  providers: [
    GetSafetyByHomeHandler,
    GetSafetyWithLogsHandler,
    CreateSafetyLogHandler,
    ConfirmSafetyLogHandler,
  ],
  exports: [CqrsModule],
})
export class SafetyCqrsModule {}
