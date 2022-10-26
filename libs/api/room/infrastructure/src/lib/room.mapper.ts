import { Injectable } from '@nestjs/common';
import { RoomSchema } from '@prisma/client';
import { Room } from '@smart-home/api/room/domain';
import { RoomDto, RoomOverviewDto } from '@smart-home/shared/dto';

@Injectable()
export class RoomMapper {
  toDomain(schema: RoomSchema, temperature: number, humidity: number): Room {
    return new Room(
      schema.id,
      schema.homeId,
      schema.name,
      temperature,
      humidity,
      schema.imgUrl,
      schema.favourite
    );
  }

  domainToOverviewDto(domain: Room): RoomOverviewDto {
    return new RoomOverviewDto(domain.id, domain.name, 5, domain.imgUrl);
  }

  schemaToOverviewDto(schema: RoomSchema): RoomOverviewDto {
    return new RoomOverviewDto(schema.id, schema.name, 5, schema.imgUrl);
  }

  toDto(domain: Room): RoomDto {
    return new RoomDto(
      domain.id,
      domain.name,
      domain.temperature,
      domain.humidity
    );
  }
}
