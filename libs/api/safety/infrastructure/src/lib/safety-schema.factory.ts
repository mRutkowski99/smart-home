import { Injectable, NotFoundException } from '@nestjs/common';
import { SafetyLogSchema, SafetySchema, Prisma } from '@prisma/client';
import { Safety, SafetyLog } from '@smart-home/api/safety/domain';
import {
  mapToDeviceSchemaInput,
  mapToDeviceType,
  mapToSafetyState,
  mapToSafetyStateSchemaEnum,
} from './utils';

export type SafetyDomainSchema = SafetySchema & {
  logs: SafetyLogSchema[];
};

export type SafetyLogInput = Prisma.SafetyLogSchemaCreateManyInput;

export type SafetyInputSchemas = [SafetySchema, SafetyLogInput[]];

@Injectable()
export class SafetySchemaFactory {
  createFromSchema(schema: SafetyDomainSchema | null): Safety {
    if (schema === null) throw new NotFoundException('Safety device not found');

    return new Safety(
      schema.id,
      schema.homeId,
      schema.name,
      mapToDeviceType(schema.type),
      schema.logs.map((log) => this.createLogFromSchema(log))
    );
  }

  create(domain: Safety): SafetyInputSchemas {
    return [
      {
        id: domain.id,
        homeId: domain.homeId,
        name: domain.name,
        type: mapToDeviceSchemaInput(domain.type),
      },
      domain.logs.map((log) => this.createLog(log)),
    ];
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

  private createLog(domain: SafetyLog): SafetyLogInput {
    return {
      id: domain.id,
      safetyId: domain.satefyId,
      createDate: domain.createDate,
      message: domain.message,
      state: mapToSafetyStateSchemaEnum(domain.state),
      confirmed: domain.confirmed,
      confirmedAt: domain.confirmedAt,
      confirmedBy: domain.confirmedBy,
    };
  }
}
