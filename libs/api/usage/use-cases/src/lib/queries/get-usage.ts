import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {UsageLogVm, UsageVm} from "@smart-home/shared/usage/util-usage-vm";
import {UsageRepository} from "@smart-home/api/usage/infrastructure";
import {UsageLogVmMapper} from "../mappers/usage-log-vm.mapper";
import {Period} from "@smart-home/shared/util";

export class GetUsageQuery {
    constructor(public readonly homeId: string, public readonly period: Period) {
    }
}

@QueryHandler(GetUsageQuery)
export class GetUsageHandler implements IQueryHandler<GetUsageQuery,void> {

    constructor(private repository: UsageRepository, private mapper: UsageLogVmMapper) {
    }

    async execute({homeId}: GetUsageQuery): Promise<void> {
        // const logs = this.mapper.mapAll(await this.repository.getLogs(homeId))
        // return {
        //     logs,
        //     usage: this.calcUsage(logs)
        // }
    }

    // private calcUsage(logs: UsageLogVm[]): number {
    //     const usage = logs[logs.length - 1] - logs[0]
    //     return usage < 0 || isNaN(usage) ? 0 : usage
    // }

}