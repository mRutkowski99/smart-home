import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import {
  SafetyDeviceSchemaEnum,
  SafetyLogSchema,
  SafetySchema,
  SafetyStateSchemaEnum,
} from '@prisma/client';
import { checkEnumKey } from '@smart-home/api/core/utils';
import {
  Safety,
  SafetyDevice,
  SafetyDeviceEnum,
  SafetyLog,
  SafetyState,
} from '@smart-home/api/safety/domain';

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
      this.mapToDeviceType(schema.type),
      schema.logs.map((log) => this.createLogFromSchema(log))
    );
  }

  private createLogFromSchema(schema: SafetyLogSchema): SafetyLog {
    return new SafetyLog(
      schema.id,
      schema.safetyId,
      schema.createDate,
      this.mapToSafetyState(schema.state),
      schema.confirmed,
      schema.confirmedAt,
      schema.confirmedBy
    );
  }

  private mapToDeviceType(type: SafetyDeviceSchemaEnum): SafetyDevice {
    if (!checkEnumKey(SafetyDeviceEnum, type))
      throw new InternalServerErrorException(
        `Key ${type} doesn't exist in SafetyDeviceEnum`
      );

    return new SafetyDevice(SafetyDeviceEnum[type]);
  }

  private mapToSafetyState(state: SafetyStateSchemaEnum): SafetyState {
    if (!checkEnumKey(SafetyState, state))
      throw new InternalServerErrorException(
        `Key ${state} doesn't exist in SafetyState`
      );

    return SafetyState[state];
  }
}
