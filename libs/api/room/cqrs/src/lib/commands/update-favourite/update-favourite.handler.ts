import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  RoomsRepository,
  RoomSchemaFactory,
} from '@smart-home/api/room/infrastructure';
import { UpdateFavouriteCommand } from './update-favourite.command';

@CommandHandler(UpdateFavouriteCommand)
export class UpdateFavouriteHandler
  implements ICommandHandler<UpdateFavouriteCommand>
{
  constructor(
    private readonly repository: RoomsRepository,
    private readonly factory: RoomSchemaFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: UpdateFavouriteCommand): Promise<any> {
    const { roomId, newValue } = command;

    const room = this.eventPublisher.mergeObjectContext(
      this.factory.createFromSchema(await this.repository.findById(roomId))
    );

    newValue ? room.addToFavourites() : room.removeFromFavourites();

    await this.repository.findAndReplace(room.id, this.factory.create(room));
  }
}
