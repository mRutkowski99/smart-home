import { DeviceValueType } from '@smart-home/shared/util';

export interface UiDeviceCard {
  readonly id: string;
  readonly name: string;
  readonly state: boolean;
  readonly setpoint: number;
  readonly valueType: DeviceValueType;
}
