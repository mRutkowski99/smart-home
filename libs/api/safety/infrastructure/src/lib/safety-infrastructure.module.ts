import { Module } from '@nestjs/common';
import { SafetySchemaFactory } from './safety-schema.factory';

@Module({
  controllers: [],
  providers: [SafetySchemaFactory],
  exports: [SafetySchemaFactory],
})
export class SafetyInfrastructureModule {}
