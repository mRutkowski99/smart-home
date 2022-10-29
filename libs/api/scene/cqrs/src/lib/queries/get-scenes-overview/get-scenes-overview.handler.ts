import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  SceneMapper,
  SceneRepository,
} from '@smart-home/api/scene/infrastructure';
import { GetScenesOverviewQuery } from './get-scenes-overview.query';
import { SceneOverviewDto } from '@smart-home/shared/dto';

@QueryHandler(GetScenesOverviewQuery)
export class GetScenesOverviewHandler
  implements IQueryHandler<GetScenesOverviewQuery>
{
  constructor(
    private readonly repository: SceneRepository,
    private readonly mapper: SceneMapper
  ) {}

  async execute(query: GetScenesOverviewQuery): Promise<SceneOverviewDto[]> {
    const { homeId } = query;
    const scenes = await this.repository.getAllForHome(homeId);
    return scenes.map((scene) => this.mapper.domainToOverviewDto(scene));
  }
}
