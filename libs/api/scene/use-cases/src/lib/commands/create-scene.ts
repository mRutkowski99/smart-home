import { DayOfWeek, Time } from '@smart-home/shared/util';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';

interface Schedule {
  dayOfWeek: DayOfWeek;
  time: Time;
}

export class CreateSceneCommand {
  constructor(
    public readonly homeId: string,
    public readonly name: string,
    public readonly schedule: { active: boolean; schedule: Schedule[] },
    public readonly devices: {
      deviceId: string;
      setpoint: number;
      state: boolean;
    }[]
  ) {}
}

@CommandHandler(CreateSceneCommand)
export class CreateSceneHandler implements ICommandHandler<CreateSceneCommand> {
  constructor(private repository: SceneRepository) {}

  async execute(command: CreateSceneCommand): Promise<void> {
    await this.repository.create(command);
  }
}
