import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {UsageLogVmMapper} from "./mappers/usage-log-vm.mapper";
import {GetUsageHandler} from "./queries/get-usage";

@Module({
  imports: [CqrsModule],
  providers: [UsageLogVmMapper, GetUsageHandler],
  exports: [CqrsModule],
})
export class ApiUsageUseCasesModule {}
