import { Module } from '@nestjs/common';
import {PrismaServiceModule} from "@smart-home/api/shared/infrastructure";
import {UserRepository} from "./user.repository";

@Module({
  imports: [PrismaServiceModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class ApiUserInfrastructureModule {}
