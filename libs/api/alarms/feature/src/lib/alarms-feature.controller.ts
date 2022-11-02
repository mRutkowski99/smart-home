import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ConfirmLogCommand,
  GetAlarmLogsQuery,
  GetAlarmsByHomeQuery,
  UpdateDefaultStateCommand,
} from '@smart-home/api/alarms/cqrs';
import { AlarmDto, AlarmWithLogsDto } from '@smart-home/shared/dto';
import {
  ConfirmLogBody,
  GetAlarmWithLogsQuery,
  UpdateDefaultStateBody,
} from '@smart-home/shared/requests';

@Controller('alarm')
export class AlarmsFeatureController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get('all/:homeId')
  async getAlarmsByHome(@Param('homeId') homeId: string): Promise<AlarmDto[]> {
    return this.queryBus.execute<GetAlarmsByHomeQuery, AlarmDto[]>(
      new GetAlarmsByHomeQuery(homeId)
    );
  }

  @Get(':id/logs')
  async getLogs(
    @Param('id') id: string,
    @Query() query: GetAlarmWithLogsQuery
  ): Promise<AlarmWithLogsDto> {
    const { from, onlyDanger } = query;
    return this.queryBus.execute<GetAlarmLogsQuery, AlarmWithLogsDto>(
      new GetAlarmLogsQuery(id, onlyDanger, from)
    );
  }

  @Patch(':id/confirm/:logId')
  async confirmLog(
    @Param('id') id: string,
    @Body() body: ConfirmLogBody
  ): Promise<void> {
    await this.commandBus.execute<ConfirmLogCommand, void>(
      new ConfirmLogCommand(id, body.logId, body.userId)
    );
  }

  @Patch(':id/defaultState')
  async updateDefaultState(
    @Param('id') id: string,
    @Body() body: UpdateDefaultStateBody
  ): Promise<void> {
    await this.commandBus.execute<UpdateDefaultStateCommand, void>(
      new UpdateDefaultStateCommand(id, body.newDefaultState)
    );
  }
}
