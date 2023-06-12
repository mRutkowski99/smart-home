import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DeviceGroupVm } from '@smart-home/shared/device/util-device-vm';
import { DeviceRepository } from '@smart-home/api/device/infrastructure';
import { DeviceVmMapper } from '../mappers/device-vm.mapper';

export class GetDevicesGroupByRoomQuery {
  constructor(public readonly homeId: string) {}
}

@QueryHandler(GetDevicesGroupByRoomQuery)
export class GetDevicesGroupByRoomHandler
  implements IQueryHandler<GetDevicesGroupByRoomQuery, DeviceGroupVm[]>
{
  constructor(
    private repository: DeviceRepository,
    private mapper: DeviceVmMapper
  ) {}

  async execute({
    homeId,
  }: GetDevicesGroupByRoomQuery): Promise<DeviceGroupVm[]> {
    return (await this.repository.getAllGroupedByRoom(homeId)).map((group) => ({
      roomName: group.roomName,
      devices: this.mapper.mapAll(group.devices),
    }));
  }
}
