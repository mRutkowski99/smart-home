import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomSchema } from '@prisma/client';
import { Room } from '@smart-home/api/room/domain';

@Injectable()
export class RoomSchemaFactory {
  createFromSchema(
    schema: RoomSchema | null,
    temperature?: number,
    humidity?: number
  ): Room {
    if (schema === null) throw new NotFoundException('Room not found');

    return new Room(
      schema.id,
      schema.homeId,
      schema.name,
      schema.imgUrl,
      schema.favourite,
      temperature,
      humidity
    );
  }

  create(domain: Room): RoomSchema {
    return {
      name: domain.name,
      imgUrl: domain.imgUrl,
      favourite: domain.isFavourite,
      homeId: domain.homeId,
      id: domain.id,
    };
  }
}
