import { Module } from '@nestjs/common';
import { ApiShellFeatureModule } from '@smart-home/api/shell/feature';

@Module({
  imports: [ApiShellFeatureModule],
})
export class AppModule {}
