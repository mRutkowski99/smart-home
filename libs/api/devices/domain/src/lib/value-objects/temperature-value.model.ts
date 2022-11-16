import { NotAcceptableException } from '@nestjs/common';
import { DeviceValue } from './device-value';

export class TemperatureValue extends DeviceValue {
  constructor(value: number) {
    if (value < 15 || value > 30)
      throw new NotAcceptableException(
        'Input for TemperatureValue must be between 15 and 30'
      );

    super(value);
  }

  readonly min = 15;
  readonly max = 30;

  get value(): number {
    return this._value;
  }
}
