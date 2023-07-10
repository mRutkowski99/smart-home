import { Module } from '@nestjs/common';
import {ApiUserInfrastructureModule} from "@smart-home/api/user/infrastructure";
import {CqrsModule} from "@nestjs/cqrs";
import {ChangePasswordHandler} from "./commands/change-password";
import {CreateUserHandler} from "./commands/create-user";
import {ResetPasswordHandler} from "./commands/reset-password";
import {DeleteUserHandler} from "./commands/delete-user";
import {UserVmMapper} from "./mappers/user-vm.mapper";
import {GetUsersByHomeHandler} from "./queries/get-users-by-home";

@Module({
  imports: [ApiUserInfrastructureModule, CqrsModule],
  providers: [ChangePasswordHandler, CreateUserHandler, ResetPasswordHandler, DeleteUserHandler, UserVmMapper, GetUsersByHomeHandler],
  exports: [CqrsModule],
})
export class ApiUserUseCasesModule {}
