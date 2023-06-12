import { DeviceVm } from './device.vm';

export interface DeviceGroupVm {
  readonly roomName: string;
  readonly devices: DeviceVm[];
}
