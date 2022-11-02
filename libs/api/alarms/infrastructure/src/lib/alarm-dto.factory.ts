import { Injectable, NotFoundException } from '@nestjs/common';
import { AlarmLogSchema, AlarmSchema } from '@prisma/client';
import {
  AlarmDto,
  AlarmLogDto,
  AlarmWithLogsDto,
} from '@smart-home/shared/dto';

type AlarmDomainSchema = AlarmSchema & {
  alarmLogs: AlarmLogSchema[];
};

@Injectable()
export class AlarmDtoFactory {
  toAlarmDto(schema: AlarmDomainSchema | null): AlarmDto {
    if (schema === null) throw new NotFoundException('Alarm not found');

    return new AlarmDto(
      schema.id,
      schema.homeId,
      schema.name,
      schema.active,
      schema.defaulState,
      schema.alarmLogs.length
    );
  }

  toAlarmWithLogsDto(schema: AlarmDomainSchema | null): AlarmWithLogsDto {
    if (schema === null) throw new NotFoundException('Alarm not found');

    return new AlarmWithLogsDto(
      schema.id,
      schema.homeId,
      schema.name,
      schema.alarmLogs.map((log) => this.mapLogFromSchema(log))
    );
  }

  private mapLogFromSchema(schema: AlarmLogSchema): AlarmLogDto {
    return new AlarmLogDto(
      schema.id,
      schema.alarmId,
      schema.createDate,
      schema.danger,
      schema.confirmed,
      schema.confirmedAt,
      schema.confirmedBy
    );
  }
}
