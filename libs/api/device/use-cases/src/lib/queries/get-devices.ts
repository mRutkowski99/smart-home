import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {DeviceVm} from "@smart-home/shared/device/util-device-vm";
import {DeviceRepository} from "@smart-home/api/device/infrastructure";
import {DeviceVmMapper} from "../mappers/device-vm.mapper";

export class GetDevicesQuery {
    constructor(public readonly homeId: string) {
    }
}

@QueryHandler(GetDevicesQuery)
export class GetDevicesHandler implements IQueryHandler<GetDevicesQuery, DeviceVm[]> {

    constructor(private repository: DeviceRepository, private mapper: DeviceVmMapper) {
    }

    async execute({homeId}: GetDevicesQuery): Promise<DeviceVm[]> {
        return this.mapper.mapAll(await this.repository.getAll(homeId))
    }

}