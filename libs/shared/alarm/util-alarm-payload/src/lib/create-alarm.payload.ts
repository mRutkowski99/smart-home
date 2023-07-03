import {AddressType} from "@prisma/client";

export interface CreateAlarmPayload {
    homeId: string;
    stateAddress: string;
    stateAddressType: AddressType;
    statusAddress: string;
    statusAddressType: AddressType;
}