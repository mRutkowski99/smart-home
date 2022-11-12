import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';
import { SafetyDtoFactory } from './safety-dto.factory';
import { SafetySchemaFactory } from './safety-schema.factory';
import { SafetyRepository } from './safety.repository';

@Module({
  imports: [PrismaServiceModule],
  providers: [SafetySchemaFactory, SafetyDtoFactory, SafetyRepository],
  exports: [SafetySchemaFactory, SafetyDtoFactory, SafetyRepository],
})
export class SafetyInfrastructureModule {}
