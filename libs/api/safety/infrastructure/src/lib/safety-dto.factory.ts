import { Injectable, NotFoundException } from '@nestjs/common';
import { SafetyLogSchema } from '@prisma/client';
import {
  SafetyDto,
  SafetyLogDto,
  SafetyWithLogsDto,
} from '@smart-home/shared/dto';
import {
  SafetyDomainSchema,
  SafetySchemaFactory,
} from './safety-schema.factory';
import { getSafetyStateName, mapToSafetyState } from './utils';

@Injectable()
export class SafetyDtoFactory {
  constructor(private readonly factory: SafetySchemaFactory) {}

  toSafetyDto(schema: SafetyDomainSchema | null): SafetyDto {
    const safety = this.factory.createFromSchema(schema);
    return new SafetyDto(
      safety.id,
      safety.homeId,
      safety.name,
      safety.device,
      safety.state,
      getSafetyStateName(safety.state)
    );
  }

  toSafetyWithLogsDto(schema: SafetyDomainSchema | null): SafetyWithLogsDto {
    if (schema === null) throw new NotFoundException('Safety device not found');

    return new SafetyWithLogsDto(
      schema.id,
      schema.homeId,
      schema.name,
      schema.logs.map((log) => this.toSafetyLogDto(log))
    );
  }

  private toSafetyLogDto(schema: SafetyLogSchema): SafetyLogDto {
    const log = this.factory.createLogFromSchema(schema);

    return new SafetyLogDto(
      log.id,
      log.satefyId,
      log.createDate,
      log.state,
      log.message,
      log.confirmed,
      log.confirmedAt,
      log.confirmedBy
    );
  }
}
