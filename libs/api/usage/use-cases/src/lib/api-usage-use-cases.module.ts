import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {UsageLogVmMapper} from "./mappers/usage-log-vm.mapper";
import {GetUsageHandler} from "./queries/get-usage";
import {ApiUsageInfrastructureModule} from "@smart-home/api/usage/infrastructure";

@Module({
  imports: [CqrsModule, ApiUsageInfrastructureModule],
  providers: [UsageLogVmMapper, GetUsageHandler],
  exports: [CqrsModule],
})
export class ApiUsageUseCasesModule {}
