import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AlarmWithLogsDto } from '@smart-home/shared/dto';
import { AlarmDtoFactory } from 'libs/api/alarms/infrastructure/src/lib/alarm-dto.factory';
import { AlarmsReadRepository } from 'libs/api/alarms/infrastructure/src/lib/alarms-read.repository';
import { GetAlarmLogsQuery } from './get-with-logs.query';

@QueryHandler(GetAlarmLogsQuery)
export class GetAlarmLogsHandler implements IQueryHandler<GetAlarmLogsQuery> {
  constructor(
    private readonly repository: AlarmsReadRepository,
    private readonly factory: AlarmDtoFactory
  ) {}

  async execute(query: GetAlarmLogsQuery): Promise<AlarmWithLogsDto> {
    const { id, onlyDanger, from } = query;
    return this.factory.toAlarmWithLogsDto(
      await this.repository.getWithLogsById(id, onlyDanger, from)
    );
  }
}
