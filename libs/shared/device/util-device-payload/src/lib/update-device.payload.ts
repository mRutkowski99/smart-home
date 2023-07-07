import {DeviceBasePayload} from "./device-base.payload";

export interface UpdateDevicePayload extends DeviceBasePayload {
  id: string;
}
