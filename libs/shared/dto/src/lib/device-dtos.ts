import { DeviceType } from '@prisma/client';

abstract class DeviceBaseDto {
  constructor(
    public readonly id: string,
    public readonly roomId: string,
    public readonly name: string,
    public readonly type: DeviceType
  ) {}
}

abstract class AnalogValueDeviceBaseDto extends DeviceBaseDto {
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

export class TemperatureDeviceDto extends AnalogValueDeviceBaseDto {
  constructor(
    id: string,
    roomId: string,
    name: string,
    value: number,
    minValue: number,
    maxValue: number,
    public readonly heatingValue: number,
    public readonly coolingValue: number,
    public readonly ecoValue: number
  ) {
    super(id, roomId, name, 'Temperature', value, minValue, maxValue);
  }
}

export class VentilationDeviceDto extends AnalogValueDeviceBaseDto {
  constructor(
    id: string,
    roomId: string,
    name: string,
    value: number,
    minValue: number,
    maxValue: number
  ) {
    super(id, roomId, name, 'Ventilation', value, minValue, maxValue);
  }
}

export class LightingDeviceDto extends AnalogValueDeviceBaseDto {
  constructor(
    id: string,
    roomId: string,
    name: string,
    value: number,
    minValue: number,
    maxValue: number
  ) {
    super(id, roomId, name, 'Lighting', value, minValue, maxValue);
  }
}

export class SunblindDeviceDto extends AnalogValueDeviceBaseDto {
  constructor(
    id: string,
    roomId: string,
    name: string,
    value: number,
    minValue: number,
    maxValue: number
  ) {
    super(id, roomId, name, 'Sunblind', value, minValue, maxValue);
  }
}

export class PowerPlugDeviceDto extends DeviceBaseDto {
  constructor(
    id: string,
    roomId: string,
    name: string,
    public readonly value: boolean
  ) {
    super(id, roomId, name, 'PowerPlug');
  }
}
