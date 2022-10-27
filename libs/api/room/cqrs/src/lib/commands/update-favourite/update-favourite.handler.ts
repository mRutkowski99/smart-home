import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  RoomMapper,
  RoomsRepository,
} from '@smart-home/api/room/infrastructure';
import { UpdateFavouriteCommand } from './update-favourite.command';

@CommandHandler(UpdateFavouriteCommand)
export class UpdateFavouriteHandler
  implements ICommandHandler<UpdateFavouriteCommand>
{
  constructor(
    private readonly repository: RoomsRepository,
    private readonly mapper: RoomMapper,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: UpdateFavouriteCommand): Promise<any> {
    const { roomId, newValue } = command;
    const roomRecord = await this.repository.getById(roomId);

    if (roomRecord === null)
      throw new BadRequestException(`Room with id: ${roomId} not found`);

    const room = this.eventPublisher.mergeObjectContext(
      this.mapper.schemaToDomain(roomRecord)
    );

    newValue ? room.addToFavourites() : room.removeFromFavourites();

    await this.repository.findAndReplace(room.id, room);
  }
}
