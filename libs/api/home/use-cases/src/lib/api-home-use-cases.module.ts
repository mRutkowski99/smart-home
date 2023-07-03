import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {HomeVmMapper} from "./mappers/home-vm.mapper";
import {GetAllHandler} from "./queries/get-all";
import {CreateHomeHandler} from "./commands/create-home";
import {DeleteHomeHandler} from "./commands/delete-home";
import {ApiHomeInfrastructureModule} from "@smart-home/api/home/infrastructure";

@Module({
  imports: [CqrsModule, ApiHomeInfrastructureModule],
  providers: [HomeVmMapper, GetAllHandler, CreateHomeHandler, DeleteHomeHandler],
  exports: [CqrsModule],
})
export class ApiHomeUseCasesModule {}
