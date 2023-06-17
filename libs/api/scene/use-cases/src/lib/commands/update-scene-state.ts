import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import { BadRequestException } from '@nestjs/common';

export class UpdateSceneStateCommand {
  constructor(public readonly id: string, public readonly state: boolean) {}
}

@CommandHandler(UpdateSceneStateCommand)
export class UpdateSceneStateHandler
  implements ICommandHandler<UpdateSceneStateCommand>
{
  constructor(
    private repository: SceneRepository,
    private publisher: EventPublisher
  ) {}

  async execute({ state, id }: UpdateSceneStateCommand): Promise<void> {
    const scene = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(id),
        new BadRequestException("Scene doesn't exist")
      )
    );

    try {
      scene.updateState(state);
    } catch (e) {
      throw new BadRequestException(e);
    }

    scene.commit();
    await this.repository.update(scene);
  }
}
