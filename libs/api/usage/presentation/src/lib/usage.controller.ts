import {Controller, Get, Headers, Query} from "@nestjs/common";
import {ApiControllerPrefix, HOME_ID_HEADER_KEY, Period} from "@smart-home/shared/util";
import {QueryBus} from "@nestjs/cqrs";
import {GetUsageQuery} from "@smart-home/api/usage/use-cases";
import {UsageLogVm} from "@smart-home/shared/usage/util-usage-vm";

@Controller(ApiControllerPrefix.Usage)
export class UsageController {
    constructor(private queryBus: QueryBus) {
    }

    @Get()
    getUsage(@Query('period') period: Period, @Headers(HOME_ID_HEADER_KEY) homeId: string) {
        return this.queryBus.execute<GetUsageQuery, UsageLogVm>(new GetUsageQuery(homeId, period))
    }
}