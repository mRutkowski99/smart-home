import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ValidationPipeModule } from '@smart-home/api/core/shared/pipes/validation';
import { PrismaServiceModule } from '@smart-home/api/core/shared/services/prisma-service';
import { WaetherApiModule } from '@smart-home/api/core/shared/services/waether-api';
import {
  GetHomeHandler,
  GetHomesHandler,
  UpdateGeolocationHandler,
} from '@smart-home/api/homes/data-access';
import { HomesController } from './homes.controller';

@Module({
  imports: [
    CqrsModule,
    ValidationPipeModule,
    WaetherApiModule,
    PrismaServiceModule,
  ],
  controllers: [HomesController],
  providers: [UpdateGeolocationHandler, GetHomeHandler, GetHomesHandler],
  exports: [],
})
export class HomesModule {}
