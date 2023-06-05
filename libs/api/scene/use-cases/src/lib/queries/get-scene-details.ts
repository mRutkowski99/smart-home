import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SceneDetailsVm } from '@smart-home/shared/scene/util-scene-vm';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { SceneDetailsVmMapper } from '../mappers/scene-details-vm.mapper';
import { throwIfNull } from '@smart-home/api/shared/util';
import { NotFoundException } from '@nestjs/common';

export class GetSceneDetailsQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetSceneDetailsQuery)
export class GetSceneDetailsHandler
  implements IQueryHandler<GetSceneDetailsQuery, SceneDetailsVm>
{
  constructor(
    private repository: SceneRepository,
    private mapper: SceneDetailsVmMapper
  ) {}

  async execute({ id }: GetSceneDetailsQuery): Promise<SceneDetailsVm> {
    return this.mapper.map(
      throwIfNull(await this.repository.getById(id), new NotFoundException())
    );
  }
}
