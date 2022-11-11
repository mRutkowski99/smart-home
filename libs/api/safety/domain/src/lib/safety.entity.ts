import { AggregateRoot } from '@nestjs/cqrs';
import { SafetyDevice, SafetyDeviceEnum } from './safety-device.model';
import { SafetyLog } from './safety-log.model';

export class Safety extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly _homeId: string,
    private readonly _name: string,
    private readonly _type: SafetyDevice,
    private _logs: SafetyLog[]
  ) {
    super();
  }

  get id(): string {
    return this.id;
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

  get unconfirmedLogs(): SafetyLog[] | null {
    const unconfirmed = this._logs.filter((log) => !log.confirmed);
    return unconfirmed.length === 0 ? null : unconfirmed;
  }

  addLog(state: boolean, disabled: boolean) {
    if (disabled) {
      const newLog = SafetyLog.create(this.id, this.disabledMessage);
      this._logs = [newLog, ...this._logs];
      this.broadcastEvent(newLog.message);
    }

    if (!state) {
      const newLog = SafetyLog.create(this.id, this.dangerMessage);
      this._logs = [newLog, ...this._logs];
      this.broadcastEvent(newLog.message);
    }
  }

  private broadcastEvent(message: string) {}

  private get disabledMessage(): string {
    return `${this.device}: ${this.name} might be disabled. Check the connection`;
  }

  private get dangerMessage(): string {
    return `${this.device}: ${this.name} has detected a danger`;
  }
}
