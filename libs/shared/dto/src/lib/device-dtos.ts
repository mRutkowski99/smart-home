import { DeviceType } from '@prisma/client';

abstract class DeviceBaseDto {
  constructor(
    public readonly id: string,
    public readonly roomId: string,
    public readonly name: string,
    public readonly type: DeviceType
  ) {}
}

export class BooleanValueDeviceDto extends DeviceBaseDto {
  constructor(
    id: string,
    roomId: string,
    name: string,
    type: DeviceType,
    public readonly value: boolean
  ) {
    super(id, roomId, name, type);
  }
}

export class PercentValueDeviceDto extends DeviceBaseDto {
  constructor(
    id: string,
    roomId: string,
    name: string,
    type: DeviceType,
    public readonly value: number,
    public readonly minValue: number,
    public readonly maxValue: number
  ) {
    super(id, roomId, name, type);
  }
}

export class TemperatureDeviceDto extends PercentValueDeviceDto {
  constructor(
    id: string,
    roomId: string,
    name: string,
    value: number,
    minValue: number,
    maxValue: number,
    public readonly state: boolean,
    public readonly heatingValue: number,
    public readonly coolingValue: number,
    public readonly ecoValue: number
  ) {
    super(id, roomId, name, 'Temperature', value, minValue, maxValue);
  }
}
