import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SceneOverviewVm } from '@smart-home/shared/scene/util-scene-vm';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { SceneOverviewVmMapper } from '../mappers/scene-overview-vm.mapper';

export class GetScenesOverviewQuery {
  constructor(public readonly homeId: string) {}
}

@QueryHandler(GetScenesOverviewQuery)
export class GetScenesOverviewHandler
  implements IQueryHandler<GetScenesOverviewQuery, SceneOverviewVm[]>
{
  constructor(
    private repository: SceneRepository,
    private mapper: SceneOverviewVmMapper
  ) {}

  async execute({
    homeId,
  }: GetScenesOverviewQuery): Promise<SceneOverviewVm[]> {
    return this.mapper.mapAll(await this.repository.getAllByHomeId(homeId));
  }
}
