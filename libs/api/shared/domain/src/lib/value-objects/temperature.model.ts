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

    this._value = this.toPointFivePrecision(_value);
  }

  get value(): number {
    return this._value;
  }

  private toPointFivePrecision(value: number): number {
    const integerPart = parseInt(value.toString());
    const fractionalPart = value - integerPart;

    if (fractionalPart <= 0.33) return integerPart;
    else if (fractionalPart <= 0.66) return integerPart + 0.5;
    else return integerPart + 1;
  }
}
