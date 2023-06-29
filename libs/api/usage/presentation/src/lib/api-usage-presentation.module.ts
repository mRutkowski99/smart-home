import { Module } from '@nestjs/common';
import {UsageController} from "./usage.controller";
import {ApiUsageUseCasesModule} from "@smart-home/api/usage/use-cases";

@Module({
  imports: [ApiUsageUseCasesModule],
  controllers: [UsageController],
})
export class ApiUsagePresentationModule {}
