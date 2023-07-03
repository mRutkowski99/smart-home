import {DeviceValueType} from "@smart-home/shared/util";
import {AddressType, ControlledValue} from "@prisma/client";

export interface CreateDevicePayload {
    roomId: string;
    name: string;
    valueType: DeviceValueType,
    addresses: {address: string, addressType: AddressType, controlledValue: ControlledValue}[];
}