import {AddressType} from "@prisma/client";

export interface Job {
    deviceId: string;
    state: {
        value: boolean,
        address: string
    };
    setpoint: {
        value: number,
        address: string,
        addressType: AddressType
    }
}