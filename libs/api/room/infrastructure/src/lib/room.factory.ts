import { Room } from '@smart-home/api/room/domain';
import { Name, Uuid } from '@smart-home/api/shared/util-value-objects';
import { RoomSchema } from '@prisma/client';

export function roomFactory(props: RoomSchema): Room {
  return new Room(
    new Uuid(props.id),
    new Uuid(props.homeId),
    new Name(props.name),
    props.imgUrl
  );
}
