import { Module } from '@nestjs/common';
import { AlarmsFeatureController } from './alarms-feature.controller';

@Module({
  controllers: [AlarmsFeatureController],
  providers: [],
  exports: [],
})
export class ApiAlarmsFeatureModule {}
