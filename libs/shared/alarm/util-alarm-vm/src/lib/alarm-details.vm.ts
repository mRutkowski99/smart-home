import {AddressType} from "@prisma/client";

export interface AlarmDetailsVm {
    id: string;
    stateAddress: string;
    stateAddressType: AddressType;
    statusAddress: string;
    statusAddressType: AddressType
}