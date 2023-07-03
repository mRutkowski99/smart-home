import { Module } from '@nestjs/common';
import { PrismaServiceModule } from '@smart-home/api/shared/infrastructure';
import {HomeRepository} from "./home.repository";

@Module({
  imports: [PrismaServiceModule],
  providers: [HomeRepository],
  exports: [HomeRepository],
})
export class ApiHomeInfrastructureModule {}
