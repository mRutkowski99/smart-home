import { NotAcceptableException } from '@nestjs/common';
import { DeviceValue } from './device-value';

export class PercentValue extends DeviceValue {
  constructor(value: number) {
    if (value < 0 || value > 100)
      throw new NotAcceptableException(
        'Input for PercentValue must be between 0 and 100'
      );

    super(value);
  }

  readonly min = 0;
  readonly max = 100;

  get value(): number {
    return this._value;
  }
}
