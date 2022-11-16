import { NotAcceptableException } from '@nestjs/common';
import { DeviceValue } from './device-value';

export class BooleanValue extends DeviceValue {
  constructor(value: number) {
    if (!(value === 1 || value === 0))
      throw new NotAcceptableException('Input for BooleanValue must be 0 or 1');

    super(value);
  }

  get value(): boolean {
    return this._value === 1;
  }
}
