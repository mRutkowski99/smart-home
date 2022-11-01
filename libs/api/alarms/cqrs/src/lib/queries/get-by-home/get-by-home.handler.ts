import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AlarmDto } from '@smart-home/shared/dto';
import { AlarmDtoFactory } from 'libs/api/alarms/infrastructure/src/lib/alarm-dto.factory';
import { AlarmsReadRepository } from 'libs/api/alarms/infrastructure/src/lib/alarms-read.repository';
import { GetAlarmsByHomeQuery } from './get-by-home.query';

@QueryHandler(GetAlarmsByHomeQuery)
export class GetAlarmsByHomeHandler
  implements IQueryHandler<GetAlarmsByHomeQuery>
{
  constructor(
    private readonly repository: AlarmsReadRepository,
    private readonly factory: AlarmDtoFactory
  ) {}

  async execute(query: GetAlarmsByHomeQuery): Promise<AlarmDto[]> {
    const { homeId } = query;
    return (await this.repository.getAllByHomeId(homeId)).map((alarm) =>
      this.factory.toAlarmDto(alarm)
    );
  }
}
