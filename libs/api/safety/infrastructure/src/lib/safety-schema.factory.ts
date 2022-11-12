import { Injectable } from '@nestjs/common';
import { SafetyLogSchema, SafetySchema } from '@prisma/client';
import { Safety, SafetyLog } from '@smart-home/api/safety/domain';
import { mapToDeviceType, mapToSafetyState } from './utils';

export type SafetyDomainSchema = SafetySchema & {
  logs: SafetyLogSchema[];
};

@Injectable()
export class SafetySchemaFactory {
  createFromSchema(schema: SafetyDomainSchema): Safety {
    return new Safety(
      schema.id,
      schema.homeId,
      schema.name,
      mapToDeviceType(schema.type),
      schema.logs.map((log) => this.createLogFromSchema(log))
    );
  }

  private createLogFromSchema(schema: SafetyLogSchema): SafetyLog {
    return new SafetyLog(
      schema.id,
      schema.safetyId,
      schema.createDate,
      mapToSafetyState(schema.state),
      schema.confirmed,
      schema.confirmedAt,
      schema.confirmedBy
    );
  }
}
