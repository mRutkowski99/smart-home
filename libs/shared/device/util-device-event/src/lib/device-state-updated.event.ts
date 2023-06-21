import {AddressType} from "@prisma/client";

export class DeviceStateUpdatedEvent {
  static pattern = 'device_state_updated';
  constructor(
    public readonly homeId: string,
    public readonly id: string,
    public readonly state: boolean,
    public readonly address: string,
    public readonly addressType: AddressType
  ) {}

  toString() {
    return JSON.stringify(this)
  }
}
