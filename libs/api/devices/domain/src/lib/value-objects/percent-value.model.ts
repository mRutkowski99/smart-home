import { NotAcceptableException } from '@nestjs/common';
import { DeviceValue } from './device-value';

export class PercentValue extends DeviceValue {
  private readonly _value: number;

  constructor(value: number) {
    super();

    if (value >= 0 && value <= 100) this._value = value;
    else
      throw new NotAcceptableException(
        'Input for PercentValue must be between 0 and 100'
      );
  }

  get value(): number {
    return this._value;
  }
}
