export class Temperature {
  private readonly _value: number;

  constructor(value: number) {
    if (value < -10 || value > 40)
      throw new Error(
        'Temperature in the room should be in range from -10 to 40'
      );

    this._value = value;
  }

  get value(): number {
    return this._value;
  }
}
