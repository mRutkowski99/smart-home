import { RoomSchema } from '@prisma/client';
import { Room } from '@smart-home/api/room/domain';
import { Name, Uuid } from '@smart-home/api/shared/util-value-objects';

export function roomMapper(room: RoomSchema): Room {
  return new Room(
    new Uuid(room.id),
    new Uuid(room.homeId),
    new Name(room.name),
    room.imgUrl
  );
}
