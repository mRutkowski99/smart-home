export class Humidity {
  private readonly _value: number;

  constructor(value: number) {
    if (value < 0 || value > 100)
      throw new Error('Humidity value should be in range from 0 to 100');

    this._value = value;
  }

  get value(): number {
    return this._value;
  }
}
