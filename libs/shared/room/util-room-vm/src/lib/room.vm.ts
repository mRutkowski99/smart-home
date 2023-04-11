import { DeviceValueType } from '@smart-home/shared/util';

interface RoomDevice {
  readonly id: string;
  readonly name: string;
  readonly state: boolean;
  readonly setpoint: number;
  readonly valueType: DeviceValueType;
}

export interface RoomVm {
  readonly id: string;
  readonly name: string;
  devices: RoomDevice[];
  readonly humidity: number | null;
  readonly temperature: number | null;
}
