import { Module } from '@nestjs/common';
import { AlarmsCqrsModule } from '@smart-home/api/alarms/cqrs';
import { AlarmsFeatureController } from './alarms-feature.controller';

@Module({
  imports: [AlarmsCqrsModule],
  controllers: [AlarmsFeatureController],
})
export class AlarmsFeatureModule {}
