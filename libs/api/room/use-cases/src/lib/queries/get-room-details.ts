import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoomVm } from '@smart-home/shared/room/util-room-vm';
import { RoomRepository } from '@smart-home/api/room/infrastructure';
import { RoomVmMapper } from '../mappers/room-vm.mapper';
import { NotFoundException } from '@nestjs/common';
import { throwIfNull } from '@smart-home/api/shared';

export class GetRoomDetailsQuery {
  constructor(public readonly roomId: string) {}
}

@QueryHandler(GetRoomDetailsQuery)
export class GetRoomDetailsHandler
  implements IQueryHandler<GetRoomDetailsQuery, RoomVm>
{
  constructor(
    private repository: RoomRepository,
    private mapper: RoomVmMapper
  ) {}

  async execute({ roomId }: GetRoomDetailsQuery): Promise<RoomVm> {
    return this.mapper.map(
      throwIfNull(
        await this.repository.getById(roomId),
        new NotFoundException()
      )
    );
  }
}
