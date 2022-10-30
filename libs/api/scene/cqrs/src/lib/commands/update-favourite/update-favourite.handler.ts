import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { UpdateFavouriteCommand } from './update-favourite.command';

@CommandHandler(UpdateFavouriteCommand)
export class UpdateFavouriteHandler
  implements ICommandHandler<UpdateFavouriteCommand>
{
  constructor(
    private readonly repository: SceneRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: UpdateFavouriteCommand): Promise<void> {
    const { id, newValue } = command;

    if ((await this.repository.exist(id)) === false)
      throw new BadRequestException(`Scene with id ${id} not found`);

    const scene = this.eventPublisher.mergeObjectContext(
      await this.repository.getById(id)
    );

    newValue ? scene.addToFavourites() : scene.removeFromFavourites();

    await this.repository.findAndReplace(scene.id, scene);
  }
}
