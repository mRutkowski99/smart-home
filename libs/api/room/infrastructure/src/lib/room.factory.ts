import { Room } from '@smart-home/api/room/domain';
import { DeviceSchema, RoomSchema } from '@prisma/client';
import { Name, Uuid } from '@smart-home/api/shared/domain';
import { deviceValueTypeMapper } from '@smart-home/api/shared/infrastructure';

export function roomFactory(
  props: RoomSchema & { devices: DeviceSchema[] }
): Room {
  return new Room(
    new Uuid(props.id),
    new Uuid(props.homeId),
    new Name(props.name),
    props.imgUrl,
    props.devices.map((device) => ({
      ...device,
      valueType: deviceValueTypeMapper(device.valueType),
    }))
  );
}
