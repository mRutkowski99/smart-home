import { Injectable } from '@nestjs/common';
import { SceneSchema } from '@prisma/client';
import { Scene } from '@smart-home/api/scene/domain';
import { SceneOverviewDto } from '@smart-home/shared/dto';

@Injectable()
export class SceneMapper {
  schemaToDomain(schema: SceneSchema): Scene {
    return new Scene(
      schema.id,
      schema.homeId,
      schema.name,
      schema.active,
      schema.favourite,
      schema.cron,
      schema.expireDate
    );
  }

  domainToSchema(domain: Scene): SceneSchema {
    return {
      id: domain.id,
      homeId: domain.homeId,
      name: domain.name,
      active: domain.isActive,
      favourite: domain.isFavourite,
      cron: domain.schedule?.cron.raw || null,
      expireDate: domain.schedule?.expireDate || null,
    };
  }

  domainToOverviewDto(domain: Scene): SceneOverviewDto {
    return {
      id: domain.id,
      name: domain.name,
      isActive: domain.isActive,
      isFavourite: domain.isFavourite,
      todaySchedule: domain.schedule?.todaySchedule?.toString() || null,
    };
  }
}
