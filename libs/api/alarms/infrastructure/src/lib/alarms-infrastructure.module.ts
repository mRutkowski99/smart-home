import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/core/services/prisma-service';

@Module({
  imports: [PrismaServiceModule],
  providers: [],
})
export class AlarmsInfrastructureModule {}
