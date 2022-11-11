export class SafetyLog {
  constructor(
    public readonly id: string,
    public readonly satefyId: string,
    public readonly message: string,
    public readonly createDate: Date,
    private _confirmed: boolean,
    private _confirmedAt: Date | null,
    private _confirmedBy: string | null
  ) {}

  get confirmed(): boolean {
    return this._confirmed;
  }

  get confirmedAt(): Date | null {
    return this._confirmedAt;
  }

  get confirmedBy(): string | null {
    return this._confirmedBy;
  }

  static create(safetyId: string, message: string): SafetyLog {
    return new SafetyLog(
      crypto.randomUUID(),
      safetyId,
      message,
      new Date(),
      false,
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
