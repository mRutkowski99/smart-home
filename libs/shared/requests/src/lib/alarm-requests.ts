import { IsDefined, IsUUID } from 'class-validator';

export class GetAlarmWithLogsQuery {
  constructor(
    public readonly onlyDanger: boolean,
    public readonly from: 'lastWeek' | 'lastMonth' | 'lastThreeMonths'
  ) {}
}

export class ConfirmLogBody {
  @IsUUID()
  @IsDefined()
  readonly logId: string;

  @IsUUID()
  @IsDefined()
  readonly userId: string;

  constructor(logId: string, userId: string) {
    this.logId = logId;
    this.userId = userId;
  }
}
