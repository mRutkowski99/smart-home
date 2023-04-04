export class Name {
  static regex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

  constructor(private readonly _value: string) {
    if (_value.trim().length === 0) throw Error('Empty name provided');
    if (!_value.match(Name.regex)) throw Error('Provide valid name');
  }

  get value(): string {
    return this._value.trim();
  }
}
