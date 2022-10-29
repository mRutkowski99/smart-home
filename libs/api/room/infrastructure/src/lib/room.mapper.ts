import { Injectable } from '@nestjs/common';
import { RoomSchema } from '@prisma/client';
import { Room } from '@smart-home/api/room/domain';
import { RoomDto, RoomOverviewDto } from '@smart-home/shared/dto';

@Injectable()
export class RoomMapper {
  schemaToDomain(
    schema: RoomSchema,
    temperature?: number,
    humidity?: number
  ): Room {
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

  domainToSchema(domain: Room): RoomSchema {
    return {
      name: domain.name,
      imgUrl: domain.imgUrl,
      favourite: domain.isFavourite,
      homeId: domain.homeId,
      id: domain.id,
    };
  }

  domainToOverviewDto(domain: Room): RoomOverviewDto {
    return new RoomOverviewDto(domain.id, domain.name, 5, domain.imgUrl);
  }

  domainToDto(domain: Room): RoomDto {
    return new RoomDto(
      domain.id,
      domain.name,
      domain.temperature,
      domain.humidity
    );
  }
}
