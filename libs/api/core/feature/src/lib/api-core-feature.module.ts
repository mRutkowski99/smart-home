import { Module } from '@nestjs/common';
import { HomesModule } from '@smart-home/api/homes/feature';

@Module({
  imports: [HomesModule],
  controllers: [],
})
export class ApiCoreFeatureModule {}
