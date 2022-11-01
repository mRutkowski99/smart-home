export class AlarmDto {
  constructor(
    public readonly id: string,
    public readonly homeId: string,
    public readonly name: string,
    public readonly active: boolean,
    public readonly deafultState: boolean,
    public readonly unconfirmedCount: number
  ) {}
}

export class AlarmLogDto {
  constructor(
    public readonly id: string,
    public readonly alarmId: string,
    public readonly createDate: Date,
    public readonly danger: boolean,
    public readonly confirmed: boolean | null,
    public readonly confirmedAt: Date | null,
    public readonly confirmedBy: string | null
  ) {}
}

export class AlarmWithLogsDto {
  constructor(
    public readonly id: string,
    public readonly homeId: string,
    public readonly name: string,
    public readonly logs: AlarmLogDto[]
  ) {}
}
