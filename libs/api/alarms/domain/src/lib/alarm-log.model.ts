// Only instances with 'danger' state equals true need to be confirmed by user

export class AlarmLog {
  constructor(
    public readonly id: string,
    public readonly alarmId: string,
    public readonly createDate: Date,
    public readonly danger: boolean,
    public readonly message: string,
    private _confirmed: boolean | null,
    private _confirmedAt: Date | null,
    private _confirmedBy: string | null
  ) {}

  get confirmed(): boolean | null {
    return this._confirmed;
  }

  get confirmedAt(): Date | null {
    return this._confirmedAt;
  }

  get confirmedBy(): string | null {
    return this._confirmedBy;
  }

  static create(alarmId: string, danger: boolean, message: string): AlarmLog {
    return new AlarmLog(
      crypto.randomUUID(),
      alarmId,
      new Date(),
      danger,
      message,
      danger ? false : null,
      null,
      null
    );
  }

  confirm(userId: string) {
    this._confirmed = true;
    this._confirmedAt = new Date();
    this._confirmedBy = userId;
  }
}
