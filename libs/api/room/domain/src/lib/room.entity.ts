import { AggregateRoot } from '@nestjs/cqrs';
import { Name, Uuid } from '@smart-home/api/shared/domain';
import { Device } from './device.interface';

export class Room extends AggregateRoot {
  constructor(
    public readonly id: Uuid,
    public readonly homeId: Uuid,
    public name: Name,
    public imgUrl: string,
    public readonly devices: Device[]
  ) {
    super();
  }

  get devicesCount(): number {
    return this.devices.length;
  }

  get enabledDevicesCount(): number {
    return this.devices.filter((device) => device.state).length;
  }
}
