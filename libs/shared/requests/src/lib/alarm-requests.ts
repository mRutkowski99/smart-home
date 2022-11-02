import { IsBoolean, IsUUID } from 'class-validator';

export class GetAlarmWithLogsQuery {
  constructor(
    public readonly onlyDanger: boolean,
    public readonly from: 'lastWeek' | 'lastMonth' | 'lastThreeMonths'
  ) {}
}

export class ConfirmLogBody {
  @IsUUID()
  readonly logId: string;

  @IsUUID()
  readonly userId: string;

  constructor(logId: string, userId: string) {
    this.logId = logId;
    this.userId = userId;
  }
}

export class UpdateDefaultStateBody {
  @IsBoolean()
  newDefaultState: boolean;

  constructor(newDefaultState: boolean) {
    this.newDefaultState = newDefaultState;
  }
}

export class UpdateActiveBody {
  @IsBoolean()
  state: boolean;

  constructor(state: boolean) {
    this.state = state;
  }
}
