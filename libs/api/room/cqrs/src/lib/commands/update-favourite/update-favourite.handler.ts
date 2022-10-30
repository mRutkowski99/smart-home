import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RoomsRepository } from '@smart-home/api/room/infrastructure';
import { UpdateFavouriteCommand } from './update-favourite.command';

@CommandHandler(UpdateFavouriteCommand)
export class UpdateFavouriteHandler
  implements ICommandHandler<UpdateFavouriteCommand>
{
  constructor(
    private readonly repository: RoomsRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: UpdateFavouriteCommand): Promise<any> {
    const { roomId, newValue } = command;

    if ((await this.repository.exist(roomId)) === false)
      throw new BadRequestException(`Room with id ${roomId} not found`);

    const room = this.eventPublisher.mergeObjectContext(
      await this.repository.getById(roomId)
    );

    newValue ? room.addToFavourites() : room.removeFromFavourites();

    await this.repository.findAndReplace(room.id, room);
  }
}
