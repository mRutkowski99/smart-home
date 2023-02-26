import { Module } from '@nestjs/common';
import { ApiSharedUtilPrismaServiceModule } from '@smart-home/api/shared/util-prisma-service';
import { IRoomRepository } from '@smart-home/api/room/use-cases';
import { RoomRepository } from './room.repository';

@Module({
  imports: [ApiSharedUtilPrismaServiceModule],
  providers: [{ provide: IRoomRepository, useClass: RoomRepository }],
})
export class ApiRoomInfrastructureModule {}
