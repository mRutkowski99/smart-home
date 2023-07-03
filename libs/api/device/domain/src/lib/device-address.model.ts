import { AddressType, ControlledValue } from '@prisma/client';

export class DeviceAddress {
  constructor(
    public readonly id: string,
    public address: string,
    public addressType: AddressType,
    public readonly controlledValue: ControlledValue
  ) {
  }
}
