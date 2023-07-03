import {DeviceValueType} from "@smart-home/shared/util";
import {AddressType, ControlledValue} from "@prisma/client";

export interface DeviceAddressVm {
    id: string;
    address: string;
    addressType: AddressType;
    controlledValue: ControlledValue;
}

export interface DeviceDetailsVm {
    id: string;
    name: string;
    valueType: DeviceValueType;
    addresses: DeviceAddressVm[]
}