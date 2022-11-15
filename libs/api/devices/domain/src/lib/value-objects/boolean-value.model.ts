import { NotAcceptableException } from '@nestjs/common';
import { DeviceValue } from './device-value';

export class BooleanValue extends DeviceValue {
  private readonly _value: boolean;

  constructor(value: number) {
    super();

    if (value === 1) this._value = true;
    else if (value === 0) this._value = false;
    else
      throw new NotAcceptableException('Input for BooleanValue must be 0 or 1');
  }

  get value(): boolean {
    return this._value;
  }

  // Integer value to store in db
  get dbValue(): number {
    return this._value ? 1 : 0;
  }
}
