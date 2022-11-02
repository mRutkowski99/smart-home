import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  AlarmDtoFactory,
  AlarmsRepository,
} from '@smart-home/api/alarms/infrastructure';
import { AlarmWithLogsDto } from '@smart-home/shared/dto';

import { GetAlarmLogsQuery } from './get-with-logs.query';

@QueryHandler(GetAlarmLogsQuery)
export class GetAlarmLogsHandler implements IQueryHandler<GetAlarmLogsQuery> {
  constructor(
    private readonly repository: AlarmsRepository,
    private readonly factory: AlarmDtoFactory
  ) {}

  async execute(query: GetAlarmLogsQuery): Promise<AlarmWithLogsDto> {
    const { id, onlyDanger, from } = query;
    return this.factory.toAlarmWithLogsDto(
      await this.repository.getWithLogsById(id, onlyDanger, from)
    );
  }
}
