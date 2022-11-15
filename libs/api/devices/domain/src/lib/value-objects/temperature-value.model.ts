import { NotAcceptableException } from '@nestjs/common';
import { DeviceValue } from './device-value';

export class TemperatureValue extends DeviceValue {
  private readonly _value: number;

  constructor(value: number) {
    super();

    if (value >= 15 && value <= 30) this._value = value;
    else
      throw new NotAcceptableException(
        'Input for TemperatureValue must be between 15 and 30'
      );
  }

  readonly min = 15;
  readonly max = 30;

  get value(): number {
    return this._value;
  }
}
