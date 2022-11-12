export enum SafetyState {
  Ok,
  Danger,
  Disabled,
}

export class SafetyLog {
  constructor(
    public readonly id: string,
    public readonly satefyId: string,
    public readonly createDate: Date,
    public readonly state: SafetyState,
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

  get message(): string {
    switch (this.state) {
      case SafetyState.Disabled:
        return 'System has lost connection with device';
      case SafetyState.Danger:
        return 'Device has detected a danger';
      default:
        return 'Device is working proprely and has not detected any danger';
    }
  }

  static create(safetyId: string, state: SafetyState): SafetyLog {
    return new SafetyLog(
      crypto.randomUUID(),
      safetyId,
      new Date(),
      state,
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
