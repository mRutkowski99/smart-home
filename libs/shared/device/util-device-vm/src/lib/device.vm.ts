import { DeviceValueType } from '@smart-home/shared/util';

export interface DeviceVm {
  readonly id: string;
  readonly roomId: string;
  readonly name: string;
  readonly state: boolean;
  readonly setpoint: number;
  readonly valueType: DeviceValueType;
  readonly roomName?: string
}
