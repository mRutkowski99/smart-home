import { Injectable, NotFoundException } from '@nestjs/common';
import { SceneSchema } from '@prisma/client';
import { Schedule } from '@smart-home/api/scene/domain';
import { SceneOverviewDto } from '@smart-home/shared/dto';

@Injectable()
export class SceneDtoFactory {
  toSceneOverviewDto(schema: SceneSchema | null): SceneOverviewDto {
    if (schema === null) throw new NotFoundException('Scene not found');

    return new SceneOverviewDto(
      schema.id,
      schema.name,
      schema.active,
      schema.favourite,
      schema.cron
        ? new Schedule(schema.cron, schema.expireDate).todaySchedule
        : null
    );
  }
}
