import { Room } from '@smart-home/api/room/domain';
import { RoomSchema } from '@prisma/client';
import { Name, Uuid } from '@smart-home/api/shared';

export function roomFactory(props: RoomSchema): Room {
  return new Room(
    new Uuid(props.id),
    new Uuid(props.homeId),
    new Name(props.name),
    props.imgUrl
  );
}
