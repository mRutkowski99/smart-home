import { AggregateRoot } from '@nestjs/cqrs';
import {
  AlarmActivatedEvent,
  ALarmDeactivatedEvent,
  AlarmTriggeredEvent,
} from '@smart-home/api/alarms/cqrs';
import { AlarmLog } from './alarm-log.model';

export class Alarm extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly _homeId: string,
    private readonly _name: string,
    private _defaultState: boolean,
    private _active: boolean,
    private _logs: AlarmLog[],
    private readonly _windowsToClose: string[],
    private readonly _doorsToClose: string[]
  ) {
    super();
  }

  get id(): string {
    return this._id;
  }

  get homeId(): string {
    return this._homeId;
  }

  get name(): string {
    return this._name;
  }

  get defaultState(): boolean {
    return this._defaultState;
  }

  set defaultState(value: boolean) {
    this._defaultState = value;
  }

  get isActive(): boolean {
    return this._active;
  }

  get logs(): AlarmLog[] {
    return [...this._logs];
  }

  get unconfirmedLogs(): AlarmLog[] | null {
    const unconfirmed = this._logs.filter((log) => log.confirmed === false);
    return unconfirmed.length === 0 ? null : unconfirmed;
  }

  activate(force = false) {
    if (this.isActive) return;

    if (this._windowsToClose.length !== 0 && !force)
      throw new Error(
        "Can't activate alarm. Following windows aren't closed:" +
          this._windowsToClose.join(', ')
      );

    if (this._doorsToClose.length !== 0 && !force)
      throw new Error(
        "Can't activate alarm. Following doors aren't closed:" +
          this._doorsToClose.join(', ')
      );

    this._active = true;
    this.apply(new AlarmActivatedEvent(this.id));
  }

  deactivate() {
    this._active = false;
    this.apply(new ALarmDeactivatedEvent(this.id));
  }

  setToDefault() {
    if (this.isActive === this.defaultState) return;
    this._defaultState ? this.activate() : this.deactivate();
  }

  addLog(message: string, danger: boolean) {
    const newLog = AlarmLog.create(this.id, danger, message);
    this._logs = [...this._logs, newLog];

    if (danger) {
      this.apply(
        new AlarmTriggeredEvent(this.id, this.name, newLog.id, message)
      );
    }
  }

  confirm(logId: string, userId: string) {
    const exist = this._logs.find(
      (log) => log.id === logId && log.confirmed === false
    );

    if (exist === undefined)
      throw new Error(`Can\'t find log to confirm with id ${logId}`);

    this._logs.forEach((log) => {
      if (log.id === logId) log.confirm(userId);
    });
  }
}
