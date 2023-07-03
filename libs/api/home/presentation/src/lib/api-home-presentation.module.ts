import { Module } from '@nestjs/common';
import {ApiHomeUseCasesModule} from "@smart-home/api/home/use-cases";
import {HomeController} from "./home.controller";

@Module({
  imports: [ApiHomeUseCasesModule],
  controllers: [HomeController],
})
export class ApiHomePresentationModule {}
