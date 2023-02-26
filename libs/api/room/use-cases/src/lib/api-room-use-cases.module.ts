import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetRoomsOverviewHandler } from './queries/get-rooms-overview';

@Module({
  imports: [CqrsModule],
  providers: [GetRoomsOverviewHandler],
})
export class ApiRoomUseCasesModule {}
