export class Humidity {
  static MIN_VALUE = 0;
  static MAX_VALUE = 100;

  constructor(private readonly _value: number) {
    if (_value < Humidity.MIN_VALUE)
      throw new Error(`Humidity can not be lower than ${Humidity.MIN_VALUE}`);

    if (_value > Humidity.MAX_VALUE)
      throw new Error(`Humidity can not be higher than ${Humidity.MAX_VALUE}`);
  }

  get value(): number {
    return this._value;
  }
}
