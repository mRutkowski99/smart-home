export class AlarmTriggeredEvent {
  constructor(
    public readonly alarmId: string,
    public readonly alarmName: string,
    public readonly logId: string,
    public readonly message: string
  ) {}
}
