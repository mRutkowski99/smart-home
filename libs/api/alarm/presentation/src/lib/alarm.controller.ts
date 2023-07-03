import {
  Body,
  Controller, Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiControllerPrefix,
  HOME_ID_HEADER_KEY,
} from '@smart-home/shared/util';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateAlarmCommand, DeleteAlarmCommand,
  GetAlarmDetailQuery,
  GetAlarmOverviewQuery,
  UpdateAlarmState,
  UpdateAlarmStatusCommand,
} from '@smart-home/api/alarm/use-cases';
import {
  AlarmDetailsVm,
  AlarmOverviewVm,
} from '@smart-home/shared/alarm/util-alarm-vm';
import { CreateAlarmPayload } from '@smart-home/shared/alarm/util-alarm-payload';

@Controller(ApiControllerPrefix.Alarm)
export class AlarmController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get()
  getAlarmOverview(@Headers(HOME_ID_HEADER_KEY) homeId: string) {
    return this.queryBus.execute<GetAlarmOverviewQuery, AlarmOverviewVm | null>(
      new GetAlarmOverviewQuery(homeId)
    );
  }

  @Get(':homeId')
  getAlarmDetails(@Param('homeId') homeId: string) {
    return this.queryBus.execute<GetAlarmDetailQuery, AlarmDetailsVm | null>(
      new GetAlarmDetailQuery(homeId)
    );
  }

  @Put('/:id/state')
  updateAlarmState(@Param('id') id: string, @Body() state: boolean) {
    return this.commandBus.execute<UpdateAlarmState>(
      new UpdateAlarmState(id, state)
    );
  }

  @Put()
  updateAlarmStatus(
    @Body() value: boolean,
    @Headers(HOME_ID_HEADER_KEY) homeId: string
  ) {
    return this.commandBus.execute<UpdateAlarmStatusCommand>(
      new UpdateAlarmStatusCommand(homeId, value)
    );
  }

  @Post()
  createAlarm(@Body() payload: CreateAlarmPayload) {
    return this.commandBus.execute<CreateAlarmCommand>(
      new CreateAlarmCommand(
        payload.homeId,
        payload.stateAddress,
        payload.stateAddressType,
        payload.statusAddress,
        payload.statusAddressType
      )
    );
  }

  @Delete(':id')
  deleteAlarm(@Param('id') id: string) {
    return this.commandBus.execute<DeleteAlarmCommand>(new DeleteAlarmCommand(id))
  }
}
