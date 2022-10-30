import { Module } from '@nestjs/common';
import { ApiCoreFeatureModule } from '@smart-home/api/core/feature';

@Module({
  imports: [ApiCoreFeatureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
