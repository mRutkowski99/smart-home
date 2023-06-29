import { Module } from '@nestjs/common';
import {PrismaServiceModule} from "@smart-home/api/shared/infrastructure";
import {UsageRepository} from "./usage.repository";

@Module({
  imports: [PrismaServiceModule],
  providers: [UsageRepository],
  exports: [UsageRepository],
})
export class ApiUsageInfrastructureModule {}
