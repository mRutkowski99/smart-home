import { DeviceSchema } from '@prisma/client';
import { Device } from '@smart-home/api/device/domain';
import { Name, Uuid } from '@smart-home/api/shared/domain';
import { deviceValueTypeMapper } from '@smart-home/api/shared/infrastructure';

export function deviceFactory(schema: DeviceSchema): Device {
  return new Device(
    new Uuid(schema.id),
    new Uuid(schema.roomId),
    new Name(schema.name),
    schema.state,
    deviceValueTypeMapper(schema.valueType),
    schema.setpoint
  );
}
