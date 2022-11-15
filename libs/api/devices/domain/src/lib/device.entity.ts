import { AggregateRoot } from '@nestjs/cqrs';
import { DeviceValue } from './value-objects/device-value';
import { CommunicationType, DeviceType } from '@prisma/client';
import { TemperatureValue } from './value-objects/temperature-value.model';
import { PercentValue } from './value-objects/percent-value.model';
import { BooleanValue } from './value-objects/boolean-value.model';
import { NotAcceptableException } from '@nestjs/common';

export class Device<T extends DeviceValue> extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly roomId: string,
    public readonly name: string,
    public readonly type: DeviceType,
    private _setpoint: T,
    public readonly address: string,
    public readonly communication: CommunicationType
  ) {
    super();

    if (!this.checkValueType(_setpoint, type))
      throw new NotAcceptableException(
        `${_setpoint.constructor.name} is not appropriate for ${type}`
      );
  }

  private checkValueType(setpoint: T, type: DeviceType): boolean {
    if (type === 'Temperature' && !(setpoint instanceof TemperatureValue))
      return false;
    if (type === 'Ventilation' && !(setpoint instanceof PercentValue))
      return false;
    if (type === 'Lighting' && !(setpoint instanceof PercentValue))
      return false;
    if (type === 'Sunblind' && !(setpoint instanceof PercentValue))
      return false;
    if (type === 'PowerPlug' && !(setpoint instanceof BooleanValue))
      return false;

    return true;
  }

  get setpoint(): T {
    return this._setpoint;
  }

  set setpoint(value: T) {
    this._setpoint = value;

    //todo: publish event
  }
}
