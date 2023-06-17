import { AggregateRoot } from '@nestjs/cqrs';
import {
  DeviceValueType as ValueTypeEnum,
  Name,
  Uuid,
} from '@smart-home/api/shared/domain';
import { SceneSchedule } from './scene-schedule.model';
import { ControlledDevice } from './controlled-device.model';
import { DayOfWeek, DeviceValueType, Time } from '@smart-home/shared/util';
import { SceneScheduleDay } from './scene-schedule-day.model';
import * as crypto from 'crypto';

export class Scene extends AggregateRoot {
  constructor(
    public readonly id: Uuid,
    public readonly homeId: Uuid,
    public name: Name,
    private _state: boolean,
    private _schedule: SceneSchedule,
    private _controlledDevices: ControlledDevice[]
  ) {
    super();
  }

  get state(): boolean {
    return this._state;
  }

  get schedule(): SceneSchedule | null {
    return this._schedule;
  }

  get scheduledForToday(): boolean {
    return this.schedule?.isScheduledForDay(new Date().getDay()) ?? false;
  }

  get controlledDevices(): ControlledDevice[] {
    return this._controlledDevices;
  }

  updateState(state: boolean) {
    this._state = state;
    //TODO: dispatch event
  }

  updateSchedule(
    active: boolean,
    scheduleDays: {
      day: DayOfWeek;
      time: Time;
    }[]
  ) {
    this._schedule = new SceneSchedule(
      this._schedule.id,
      active,
      scheduleDays.map(
        (day) => new SceneScheduleDay(day.day, day.time.hours, day.time.minutes)
      )
    );

    //TODO: dispatch event
  }

  updateControlledDeviceState(deviceId: string, state: boolean) {
    const device = this._controlledDevices.find(
      (device) => device.deviceId.value === deviceId
    );

    if (!device) throw new Error(`Device with id ${deviceId} doesn't exist`);

    device.setValue(device.setpoint, state);
  }

  updateControlledDeviceSetpoint(deviceId: string, setpoint: number) {
    const device = this._controlledDevices.find(
      (device) => device.deviceId.value === deviceId
    );

    if (!device) throw new Error(`Device with id ${deviceId} doesn't exist`);

    device.setValue(setpoint, device.state);
  }

  removeControlledDevice(deviceId: string) {
    this._controlledDevices = this.controlledDevices.filter(
      (device) => device.deviceId.value !== deviceId
    );
  }

  addControlledDevice(
    deviceId: string,
    setpoint: number,
    state: boolean,
    valueType: DeviceValueType
  ) {
    if (
      this._controlledDevices.find(
        (device) => device.deviceId.value === deviceId
      )
    )
      throw new Error('Device already assigned');

    this._controlledDevices = [
      ...this._controlledDevices,
      new ControlledDevice(
        new Uuid(crypto.randomUUID()),
        new Uuid(deviceId),
        undefined,
        undefined,
        undefined,
        valueType as ValueTypeEnum,
        setpoint,
        state
      ),
    ];

    //TODO: dispatch event
  }
}
