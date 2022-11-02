import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AlarmDto } from '@smart-home/shared/dto';
import {
  AlarmsRepository,
  AlarmDtoFactory,
} from '@smart-home/api/alarms/infrastructure';
import { GetAlarmsByHomeQuery } from './get-by-home.query';

@QueryHandler(GetAlarmsByHomeQuery)
export class GetAlarmsByHomeHandler
  implements IQueryHandler<GetAlarmsByHomeQuery>
{
  constructor(
    private readonly repository: AlarmsRepository,
    private readonly factory: AlarmDtoFactory
  ) {}

  async execute(query: GetAlarmsByHomeQuery): Promise<AlarmDto[]> {
    const { homeId } = query;
    return (await this.repository.getAllByHomeId(homeId)).map((alarm) =>
      this.factory.toAlarmDto(alarm)
    );
  }
}
