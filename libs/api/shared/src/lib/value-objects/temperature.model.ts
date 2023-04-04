export class Temperature {
  static MIN_VALUE = 10;
  static MAX_VALUE = 50;

  constructor(private readonly _value: number) {
    if (_value < Temperature.MIN_VALUE)
      throw new Error(
        `Temperature can not be lower than ${Temperature.MIN_VALUE}`
      );

    if (_value > Temperature.MAX_VALUE)
      throw new Error(
        `Temperature can not be higher than ${Temperature.MAX_VALUE}`
      );
  }

  get value(): number {
    return this._value;
  }
}
