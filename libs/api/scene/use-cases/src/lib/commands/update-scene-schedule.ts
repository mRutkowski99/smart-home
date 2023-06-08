import { DayOfWeek, Time } from '@smart-home/shared/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import { BadRequestException } from '@nestjs/common';

interface Schedule {
  day: DayOfWeek;
  time: Time;
}

export class UpdateSceneScheduleCommand {
  constructor(
    public readonly id: string,
    public readonly active: boolean,
    public readonly schedule: Schedule[]
  ) {}
}

@CommandHandler(UpdateSceneScheduleCommand)
export class UpdateSceneScheduleHandler
  implements ICommandHandler<UpdateSceneScheduleCommand, void>
{
  constructor(
    private repository: SceneRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: UpdateSceneScheduleCommand): Promise<void> {
    const scene = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(command.id),
        new BadRequestException("Scene doesn't exist")
      )
    );

    try {
      scene.updateSchedule(command.active, command.schedule);
    } catch (error: unknown) {
      throw new BadRequestException(error);
    }

    scene.commit();
    await this.repository.update(scene);
  }
}
