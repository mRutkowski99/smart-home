import { AddressType, ControlledValue } from '@prisma/client';

export interface UpdateDevicePayload {
  id: string;
  name: string;
  addresses: {
    address: string;
    addressType: AddressType;
    controlledValue: ControlledValue;
  }[];
}
