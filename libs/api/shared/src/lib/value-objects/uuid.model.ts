export class Uuid {
  static regex =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

  constructor(private readonly _value: string) {
    if (!_value.match(Uuid.regex)) throw new Error('Provide valid UUID');
  }

  get value(): string {
    return this._value;
  }
}
