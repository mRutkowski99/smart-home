import { DayOfWeek, DeviceValueType, Time } from '@smart-home/shared/util';

export interface SceneScheduleDayVm {
  readonly dayOfWeek: DayOfWeek;
  readonly time: Time;
}

export interface SceneScheduleVm {
  readonly active: boolean;
  readonly days: SceneScheduleDayVm[];
}

export interface ControlledDeviceVm {
  readonly id: string;
  readonly deviceId: string;
  readonly deviceName: string;
  readonly roomId: string;
  readonly roomName: string;
  readonly valueType: DeviceValueType;
  readonly setpoint: number;
  readonly state: boolean;
}

export interface SceneDetailsVm {
  readonly id: string;
  readonly name: string;
  readonly state: boolean;
  readonly schedule: SceneScheduleVm | null;
  readonly devices: ControlledDeviceVm[];
}
