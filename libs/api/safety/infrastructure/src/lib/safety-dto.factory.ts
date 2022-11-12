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
import { mapToSafetyState } from './utils';

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
      safety.state
    );
  }

  toSafetyWithLogsDto(schema: SafetyDomainSchema | null): SafetyWithLogsDto {
    if (schema === null) throw new NotFoundException('Safety device not found');

    return new SafetyWithLogsDto(
      schema.id,
      schema.homeId,
      schema.logs.map((log) => this.toSafetyLogDto(log))
    );
  }

  private toSafetyLogDto(schema: SafetyLogSchema): SafetyLogDto {
    return new SafetyLogDto(
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
