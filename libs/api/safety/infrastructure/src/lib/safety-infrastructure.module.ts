import { Module } from '@nestjs/common';
import { SafetyDtoFactory } from './safety-dto.factory';
import { SafetySchemaFactory } from './safety-schema.factory';

@Module({
  controllers: [],
  providers: [SafetySchemaFactory, SafetyDtoFactory],
  exports: [SafetySchemaFactory, SafetyDtoFactory],
})
export class SafetyInfrastructureModule {}
