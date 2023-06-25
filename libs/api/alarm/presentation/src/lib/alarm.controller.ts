import {Body, Controller, Get, Headers, Param, Put} from "@nestjs/common";
import {ApiControllerPrefix, HOME_ID_HEADER_KEY} from "@smart-home/shared/util";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetAlarmOverviewQuery, UpdateAlarmState, UpdateAlarmStatusCommand} from "@smart-home/api/alarm/use-cases";
import {AlarmOverviewVm} from "@smart-home/shared/alarm/util-alarm-vm";


@Controller(ApiControllerPrefix.Alarm)
export class AlarmController {
    constructor(private queryBus: QueryBus, private commandBus: CommandBus) {
    }

    @Get()
    getAlarmOverview(@Headers(HOME_ID_HEADER_KEY) homeId: string) {
        return this.queryBus.execute<GetAlarmOverviewQuery, AlarmOverviewVm | null>(
            new GetAlarmOverviewQuery(homeId)
        )
    }

    @Put('/:id/state')
    updateAlarmState(@Param('id') id: string, @Body() state: boolean) {
        return this.commandBus.execute<UpdateAlarmState>(new UpdateAlarmState(id, state))
    }

    @Put()
    updateAlarmStatus(@Body() value: boolean, @Headers(HOME_ID_HEADER_KEY) homeId: string) {
        return this.commandBus.execute<UpdateAlarmStatusCommand>(new UpdateAlarmStatusCommand(homeId, value))
    }
}