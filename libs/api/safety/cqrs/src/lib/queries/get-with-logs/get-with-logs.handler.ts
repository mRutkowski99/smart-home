import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  SafetyDtoFactory,
  SafetyRepository,
} from '@smart-home/api/safety/infrastructure';
import { SafetyWithLogsDto } from '@smart-home/shared/dto';
import { GetSafetyWithLogsQuery } from './get-with-logs.query';

@QueryHandler(GetSafetyWithLogsQuery)
export class GetSafetyWithLogsHandler
  implements IQueryHandler<GetSafetyWithLogsQuery>
{
  constructor(
    private readonly repository: SafetyRepository,
    private readonly factory: SafetyDtoFactory
  ) {}

  async execute(query: GetSafetyWithLogsQuery): Promise<SafetyWithLogsDto> {
    const { id, from, onlyDanger } = query;
    const safety = await this.repository.getWithLogsById(id, onlyDanger, from);
    return this.factory.toSafetyWithLogsDto(safety);
  }
}
