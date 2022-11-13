import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  RoomDtoFactory,
  RoomsRepository,
} from '@smart-home/api/room/infrastructure';
import { RoomDto } from '@smart-home/shared/dto';
import { GetRoomDetails } from './get-room-details.query';

@QueryHandler(GetRoomDetails)
export class GetRoomDetailsHandler implements IQueryHandler<GetRoomDetails> {
  constructor(
    private readonly repository: RoomsRepository,
    private readonly factory: RoomDtoFactory
  ) {}

  async execute(query: GetRoomDetails): Promise<RoomDto> {
    const { id } = query;
    return this.factory.toRoomDto(await this.repository.findById(id), 25, 80);
  }
}
