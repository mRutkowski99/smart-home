import { DeviceValue } from './device-value.interface';

export class Percent implements DeviceValue {
  static MIN_VALUE = 0;
  static MAX_VALUE = 100;

  constructor(private readonly _value: number) {
    if (_value < Percent.MIN_VALUE)
      throw new Error(
        `Percent value can not be lower than ${Percent.MIN_VALUE}`
      );

    if (_value > Percent.MAX_VALUE)
      throw new Error(
        `Percent value can not be higher than ${Percent.MAX_VALUE}`
      );
  }

  get value(): number {
    return this._value;
  }
}
