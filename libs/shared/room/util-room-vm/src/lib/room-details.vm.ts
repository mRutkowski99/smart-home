import {DeviceDetailsVm} from "@smart-home/shared/device/util-device-vm";

export interface RoomDetailsVm {
    id: string;
    homeId: string;
    name: string;
    devices: DeviceDetailsVm[]
}