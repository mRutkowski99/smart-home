import { Injectable, NotFoundException } from '@nestjs/common';
import { RoomSchema } from '@prisma/client';
import { RoomOverviewDto } from '@smart-home/shared/dto';

@Injectable()
export class RoomDtoFactory {
  toRoomOverviewDto(schema: RoomSchema | null): RoomOverviewDto {
    if (schema === null) throw new NotFoundException('Room not found');

    return new RoomOverviewDto(
      schema.id,
      schema.name,
      5,
      schema.imgUrl,
      schema.favourite
    );
  }
}
