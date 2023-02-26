import { RoomSchema } from '@prisma/client';
import { RoomOverviewDto } from '@smart-home/shared/room/util-dto';

export function roomOverviewDtoMapper(room: RoomSchema): RoomOverviewDto {
  return {
    id: room.id,
    name: room.name,
    imgUrl: room.imgUrl,
  };
}
