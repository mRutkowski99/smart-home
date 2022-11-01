import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { AlarmDtoFactory } from './alarm-dto.factory';
import { AlarmSchemaFactory } from './alarm-schema.factory';
import { AlarmsReadRepository } from './alarms-read.repository';
import { AlarmsWriteRepository } from './alarms-write.repository';

@Module({
  imports: [PrismaServiceModule],
  providers: [
    AlarmDtoFactory,
    AlarmSchemaFactory,
    AlarmsReadRepository,
    AlarmsWriteRepository,
  ],
})
export class AlarmsInfrastructureModule {}
