import { RoomSchema } from '@prisma/client';
import { RoomDto } from '@smart-home/shared/room/util-dto';

export function roomDtoMapper(room: RoomSchema): RoomDto {
  return {
    id: room.id,
    name: room.name,
  };
}
