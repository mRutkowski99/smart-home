import { DeviceValueType } from '@smart-home/api/shared/domain';

export interface Device {
  readonly id: string;
  readonly name: string;
  readonly state: boolean;
  readonly setpoint: number;
  readonly valueType: DeviceValueType;
}
