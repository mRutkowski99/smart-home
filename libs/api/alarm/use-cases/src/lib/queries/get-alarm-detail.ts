import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {AlarmDetailsVm} from "@smart-home/shared/alarm/util-alarm-vm";
import {AlarmRepository} from "@smart-home/api/alarm/infrastructure";
import {AlarmDetailVmMapper} from "../mappers/alarm-detail-vm.mapper";

export class GetAlarmDetailQuery {
    constructor(public readonly homeId: string) {
    }
}

@QueryHandler(GetAlarmDetailQuery)
export class GetAlarmDetailHandler implements IQueryHandler<GetAlarmDetailQuery, AlarmDetailsVm | null> {

    constructor(private repository: AlarmRepository, private mapper: AlarmDetailVmMapper) {
    }

    async execute({homeId}: GetAlarmDetailQuery): Promise<AlarmDetailsVm | null> {
        return this.mapper.map(await this.repository.getByHomeId(homeId));
    }
}