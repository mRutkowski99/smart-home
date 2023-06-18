import { AddressType } from '@prisma/client';

export class DeviceSetpointUpdated {
    static pattern = 'device_setpoint_updated'
  constructor(
    public readonly homeId: string,
    public readonly id: string,
    public readonly setpoint: number,
    public readonly address: string,
    public readonly addressType: AddressType
  ) {}

    toString() {
        return JSON.stringify({
            homeId: this.homeId,
            id: this.id,
            setpoint: this.setpoint,
            address: this.address,
            addressType: this.addressType
        })
    }
}
