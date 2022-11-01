import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AlarmDto } from '@smart-home/shared/dto';
import { GetAlarmsByHomeQuery } from 'libs/api/alarms/cqrs/src/lib/queries';

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
}
