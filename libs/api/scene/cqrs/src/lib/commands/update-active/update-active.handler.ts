import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { UpdateActiveCommand } from './update-active.command';

@CommandHandler(UpdateActiveCommand)
export class UpdateActiveHandler
  implements ICommandHandler<UpdateActiveCommand>
{
  constructor(
    private readonly repository: SceneRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: UpdateActiveCommand): Promise<void> {
    const { id, value } = command;

    if ((await this.repository.exist(id)) === false)
      throw new BadRequestException(`Scene with id ${id} not found`);

    const scene = this.eventPublisher.mergeObjectContext(
      await this.repository.getById(id)
    );

    value ? scene.enable() : scene.disable();
    scene.commit();

    await this.repository.findAndReplace(scene.id, scene);
  }
}
