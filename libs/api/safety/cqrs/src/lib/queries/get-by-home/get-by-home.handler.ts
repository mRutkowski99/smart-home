import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  SafetyDtoFactory,
  SafetyRepository,
} from '@smart-home/api/safety/infrastructure';
import { SafetyDto } from '@smart-home/shared/dto';
import { GetSafetyByHomeQuery } from './get-by-home.query';

@QueryHandler(GetSafetyByHomeQuery)
export class GetSafetyByHomeHandler
  implements IQueryHandler<GetSafetyByHomeQuery>
{
  constructor(
    private readonly repository: SafetyRepository,
    private readonly factory: SafetyDtoFactory
  ) {}

  async execute(query: GetSafetyByHomeQuery): Promise<SafetyDto[]> {
    const { homeId } = query;
    const safeties = await this.repository.getAllByHomeId(homeId);
    return safeties.map((safety) => this.factory.toSafetyDto(safety));
  }
}
