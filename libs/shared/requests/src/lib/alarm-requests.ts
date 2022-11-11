import { IsBoolean, IsDefined, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

function toBoolean(value: string) {
  return value === 'true';
}

function toString(value: string) {
  console.log(value);
  return '' + value;
}

export class GetAlarmWithLogsQuery {
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  readonly onlyDanger: boolean;

  @IsDefined()
  readonly from: 'lastWeek' | 'lastMonth' | 'lastThreeMonths';

  constructor(
    onlyDanger: boolean,
    from: 'lastWeek' | 'lastMonth' | 'lastThreeMonths'
  ) {
    this.onlyDanger = onlyDanger;
    this.from = from;
  }

  toQueryParams() {
    return {
      onlyDanger: this.onlyDanger,
      from: this.from,
    };
  }
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
