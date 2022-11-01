import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AlarmDto } from '@smart-home/shared/dto';
import { AlarmsReadRepository } from 'libs/api/alarms/infrastructure/src/lib/alarms-read.repository';
import { GetAlarmsByHomeQuery } from './get-by-home.query';

@QueryHandler(GetAlarmsByHomeQuery)
export class GetAlarmsByHomeHandler
  implements IQueryHandler<GetAlarmsByHomeQuery>
{
  constructor(private readonly repository: AlarmsReadRepository) {}

  async execute(query: GetAlarmsByHomeQuery): Promise<AlarmDto[]> {
    const { homeId } = query;
    return await this.repository.getAllByHomeId(homeId);
  }
}
