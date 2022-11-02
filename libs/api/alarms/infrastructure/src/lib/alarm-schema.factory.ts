import { Injectable } from '@nestjs/common';
import { AlarmLogSchema, AlarmSchema } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
import { Alarm, AlarmLog } from '@smart-home/api/alarms/domain';
import { Prisma } from '@prisma/client';

type AlarmDomainSchema = AlarmSchema & {
  alarmLogs: AlarmLogSchema[];
};

type AlarmSchemas = [AlarmSchema, Prisma.AlarmLogSchemaCreateManyAlarmInput[]];

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

  create(domain: Alarm): AlarmSchemas {
    return [
      {
        id: domain.id,
        homeId: domain.homeId,
        name: domain.name,
        active: domain.isActive,
        defaulState: domain.defaultState,
      },
      domain.logs.map((log) => this.createLog(log)),
    ];
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

  // Alarm logs can be created only as includes of Alarm (needs type without alramId which is defined in relationship)
  private createLog(
    domain: AlarmLog
  ): Prisma.AlarmLogSchemaCreateManyAlarmInput {
    return {
      id: domain.id,
      createDate: domain.createDate,
      danger: domain.danger,
      message: domain.message,
      confirmed: domain.confirmed,
      confirmedAt: domain.confirmedAt,
      confirmedBy: domain.confirmedBy,
    };
  }
}
