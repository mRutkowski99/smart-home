import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { AlarmDtoFactory } from './alarm-dto.factory';
import { AlarmSchemaFactory } from './alarm-schema.factory';
import { AlarmsRepository } from './alarms.repository';

@Module({
  imports: [PrismaServiceModule],
  providers: [AlarmDtoFactory, AlarmSchemaFactory, AlarmsRepository],
  exports: [AlarmDtoFactory, AlarmSchemaFactory, AlarmsRepository],
})
export class AlarmsInfrastructureModule {}
