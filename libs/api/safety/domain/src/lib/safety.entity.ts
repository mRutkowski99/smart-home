import { AggregateRoot } from '@nestjs/cqrs';
import { SafetyDevice, SafetyDeviceEnum } from './safety-device.model';
import { SafetyLog, SafetyState } from './safety-log.model';
import * as dayjs from 'dayjs';
import {
  SafetyDeviceDisabledEvent,
  SafetyDeviceTriggeredEvent,
} from '@smart-home/api/safety/cqrs';

export class Safety extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly _homeId: string,
    private readonly _name: string,
    private readonly _type: SafetyDevice,
    private _logs: SafetyLog[]
  ) {
    super();
    this._logs = this._logs.sort((a, b) =>
      dayjs(a.createDate).isAfter(b.createDate) ? 1 : -1
    );
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

  get type(): SafetyDeviceEnum {
    return this._type.type;
  }

  get device(): string {
    return this._type.toString();
  }

  get logs(): SafetyLog[] {
    return [...this._logs];
  }

  get state(): SafetyState {
    return this._logs.at(0)?.state || SafetyState.Ok;
  }

  get unconfirmedLogs(): SafetyLog[] | null {
    const unconfirmed = this._logs.filter((log) => log.confirmed === false);
    return unconfirmed.length === 0 ? null : unconfirmed;
  }

  addLog(danger: boolean, disabled: boolean) {
    if (this.isLogDuplicate(danger, disabled)) return;

    const newLog = SafetyLog.create(
      this.id,
      this.newLogState(danger, disabled)
    );
    this._logs = [newLog, ...this._logs];

    if (newLog.state === SafetyState.Disabled)
      this.apply(new SafetyDeviceDisabledEvent(this._homeId, this._id));

    if (newLog.state === SafetyState.Danger)
      this.apply(new SafetyDeviceTriggeredEvent(this._homeId, this._id));
  }

  private isLogDuplicate(danger: boolean, disabled: boolean): boolean {
    if (disabled && this.state == SafetyState.Disabled) return true;
    if (danger && this.state === SafetyState.Danger) return true;
    if (!danger && !disabled && this.state === SafetyState.Ok) return true;
    return false;
  }

  private newLogState(danger: boolean, disabled: boolean): SafetyState {
    if (disabled) return SafetyState.Disabled;
    if (danger) return SafetyState.Danger;
    return SafetyState.Ok;
  }
}
