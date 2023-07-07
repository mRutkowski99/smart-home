import {DeviceBasePayload} from "./device-base.payload";

export interface CreateDevicePayload extends DeviceBasePayload {
    roomId: string;
}