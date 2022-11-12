import { Module } from '@nestjs/common';
import { SafetyCqrsModule } from '@smart-home/api/safety/cqrs';
import { SafetyController } from './safety.controller';

@Module({
  imports: [SafetyCqrsModule],
  controllers: [SafetyController],
})
export class SafetyFeatureModule {}
