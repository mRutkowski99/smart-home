export abstract class DeviceValue {
  protected readonly _value: number;

  constructor(value: number) {
    this._value = value;
  }

  get dbValue(): number {
    return this._value;
  }
}
