export class GetAlarmLogsQuery {
  constructor(
    public readonly id: string,
    public readonly onlyDanger: boolean,
    public readonly from: 'lastWeek' | 'lastMonth' | 'lastThreeMonths'
  ) {}
}
