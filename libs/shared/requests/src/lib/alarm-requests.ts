export class GetAlarmWithLogsQuery {
  constructor(
    public readonly onlyDanger: boolean,
    public readonly from: 'lastWeek' | 'lastMonth' | 'lastThreeMonths'
  ) {}
}
