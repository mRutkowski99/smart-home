import { DeviceValueType } from '@smart-home/shared/util';

export interface AddControlledDevicePayload {
  readonly sceneId: string;
  readonly deviceId: string;
  readonly setpoint: number;
  readonly state: boolean;
  readonly valueType: DeviceValueType;
}
