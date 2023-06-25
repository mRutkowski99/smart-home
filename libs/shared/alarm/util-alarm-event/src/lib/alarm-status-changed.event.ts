
export class AlarmStatusChangedEvent {
    static pattern = 'alarm_status_changed'

    constructor(public readonly homeId: string) {
    }
}