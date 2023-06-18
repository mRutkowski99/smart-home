import { AddressType, ControlledValue } from '@prisma/client';

export class DeviceAddress {
  constructor(
    public readonly id: string,
    public readonly address: string,
    public readonly addressType: AddressType,
    public readonly controlledValue: ControlledValue
  ) {
  }
}
