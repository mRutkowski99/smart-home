export class DigitalValue {
  static LOW_STATE = 0;
  static HIGH_STATE = 1;

  protected constructor(private readonly _value: number) {
    if (_value !== DigitalValue.LOW_STATE && _value !== DigitalValue.HIGH_STATE)
      throw new Error(
        `Value provided for Digital must be ${DigitalValue.LOW_STATE} or ${DigitalValue.HIGH_STATE}`
      );
  }

  get value(): number {
    return this._value;
  }

  static lowState(): DigitalValue {
    return new DigitalValue(DigitalValue.LOW_STATE);
  }

  static highState(): DigitalValue {
    return new DigitalValue(DigitalValue.HIGH_STATE);
  }
}
