import { Injectable } from '@nestjs/common';
import { AlarmLogSchema, AlarmSchema } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
import { Alarm, AlarmLog } from '@smart-home/api/alarms/domain';

type AlarmDomainSchema = AlarmSchema & {
  alarmLogs: AlarmLogSchema[];
};

@Injectable()
export class AlarmSchemaFactory {
  createFromSchema(
    schema: AlarmDomainSchema | null,
    doorsToClose: string[],
    windowsToClose: string[]
  ): Alarm {
    if (schema === null) throw new NotFoundError('Alarm not found');

    return new Alarm(
      schema.id,
      schema.homeId,
      schema.name,
      schema.defaulState,
      schema.active,
      schema.alarmLogs.map((log) => this.createLogFromSchema(log)),
      [...doorsToClose],
      [...windowsToClose]
    );
  }

  create(domain: Alarm): { alarm: AlarmSchema; logs: AlarmLogSchema[] } {
    return {
      alarm: {
        id: domain.id,
        homeId: domain.homeId,
        name: domain.name,
        active: domain.isActive,
        defaulState: domain.defaultState,
      },
      logs: [...domain.logs],
    };
  }

  private createLogFromSchema(schema: AlarmLogSchema): AlarmLog {
    return new AlarmLog(
      schema.id,
      schema.alarmId,
      schema.createDate,
      schema.danger,
      schema.message,
      schema.confirmed,
      schema.confirmedAt,
      schema.confirmedBy
    );
  }
}
