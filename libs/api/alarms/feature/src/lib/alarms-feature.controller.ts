import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AlarmDto, AlarmWithLogsDto } from '@smart-home/shared/dto';
import { GetAlarmWithLogsQuery } from '@smart-home/shared/requests';
import {
  GetAlarmLogsQuery,
  GetAlarmsByHomeQuery,
} from 'libs/api/alarms/cqrs/src/lib/queries';

@Controller('alarms')
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
}
