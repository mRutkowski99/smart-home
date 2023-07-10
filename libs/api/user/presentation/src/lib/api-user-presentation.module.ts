import { Module } from '@nestjs/common';
import {ApiUserUseCasesModule} from "@smart-home/api/user/use-cases";
import {UserController} from "./user.controller";

@Module({
  imports: [ApiUserUseCasesModule],
  controllers: [UserController],
})
export class ApiUserPresentationModule {}
