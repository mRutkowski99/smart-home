import { Injectable, NotFoundException } from '@nestjs/common';
import { SceneSchema } from '@prisma/client';
import { Scene } from '@smart-home/api/scene/domain';

@Injectable()
export class SceneSchemaFactory {
  createFromSchema(schema: SceneSchema | null): Scene {
    if (schema === null) throw new NotFoundException('Scene not found');

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

  create(domain: Scene): SceneSchema {
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
}
