import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined } from 'class-validator';
import { toBoolean } from './utils';

export class GetWithLogsQuery {
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
