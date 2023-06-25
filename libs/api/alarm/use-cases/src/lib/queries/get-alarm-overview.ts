import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {AlarmOverviewVm} from "@smart-home/shared/alarm/util-alarm-vm";
import {AlarmRepository} from "@smart-home/api/alarm/infrastructure";
import {AlarmOverviewVmMapper} from "../mappers/alarm-overview-vm.mapper";

export class GetAlarmOverviewQuery {
    constructor(public readonly homeId: string) {
    }
}

@QueryHandler(GetAlarmOverviewQuery)
export class GetAlarmOverviewHandler implements IQueryHandler<GetAlarmOverviewQuery, AlarmOverviewVm | null> {

    constructor(private repository: AlarmRepository, private mapper: AlarmOverviewVmMapper) {
    }

    async execute({homeId}: GetAlarmOverviewQuery): Promise<AlarmOverviewVm | null> {
        const alarm = await this.repository.getByHomeId(homeId)
        return alarm ? this.mapper.map(alarm) : null
    }

}