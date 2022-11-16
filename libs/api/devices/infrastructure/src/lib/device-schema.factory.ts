import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { DeviceSchema, TemperatureDeviceSchema } from '@prisma/client';
import {
  BooleanValue,
  Device,
  DeviceValue,
  PercentValue,
  TemperatureDevice,
  TemperatureValue,
} from '@smart-home/api/devices/domain';

@Injectable()
export class DeviceSchemFactory {
  create<T extends DeviceValue>(device: Device<T>): DeviceSchema {
    return {
      id: device.id,
      roomId: device.roomId,
      name: device.name,
      type: device.type,
      value: device.setpoint.dbValue,
      address: device.address,
      communicationType: device.communication,
    };
  }

  createTemperatureDeviceFromSchema(
    schema: TemperatureDeviceSchema | null
  ): TemperatureDevice {
    if (schema === null) throw new NotFoundException('Device not found');

    return new TemperatureDevice(
      schema.id,
      schema.roomId,
      schema.name,
      new TemperatureValue(schema.value),
      schema.address,
      schema.communicationType,
      schema.state,
      new TemperatureValue(schema.heatingValue),
      new TemperatureValue(schema.coolingValue)
    );
  }

  createPercentValueDeviceFromSchema(
    schema: DeviceSchema | null
  ): Device<PercentValue> {
    if (schema === null) throw new NotFoundException('Device not found');

    if (
      schema.type !== 'Ventilation' &&
      schema.type !== 'Lighting' &&
      schema.type !== 'Sunblind'
    )
      throw new NotAcceptableException('PercentValue device type required');

    return new Device<PercentValue>(
      schema.id,
      schema.roomId,
      schema.name,
      schema.type,
      new PercentValue(schema.value),
      schema.address,
      schema.communicationType
    );
  }

  createBooleanValueDeviceFromSchema(
    schema: DeviceSchema | null
  ): Device<BooleanValue> {
    if (schema === null) throw new NotFoundException('Device not found');

    if (schema.type !== 'PowerPlug')
      throw new NotAcceptableException('BooleanValue device type rwquired');

    return new Device<BooleanValue>(
      schema.id,
      schema.roomId,
      schema.name,
      schema.type,
      new BooleanValue(schema.value),
      schema.address,
      schema.communicationType
    );
  }
}
