import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  SceneRepository,
  SceneSchemaFactory,
} from '@smart-home/api/scene/infrastructure';
import { UpdateFavouriteCommand } from './update-favourite.command';

@CommandHandler(UpdateFavouriteCommand)
export class UpdateFavouriteHandler
  implements ICommandHandler<UpdateFavouriteCommand>
{
  constructor(
    private readonly repository: SceneRepository,
    private readonly factory: SceneSchemaFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: UpdateFavouriteCommand): Promise<void> {
    const { id, newValue } = command;

    const scene = this.eventPublisher.mergeObjectContext(
      this.factory.createFromSchema(await this.repository.findById(id))
    );

    newValue ? scene.addToFavourites() : scene.removeFromFavourites();

    scene.commit();
    await this.repository.findAndReplace(scene.id, this.factory.create(scene));
  }
}
