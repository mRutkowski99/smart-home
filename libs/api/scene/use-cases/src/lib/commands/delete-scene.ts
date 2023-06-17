import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';

export class DeleteSceneCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteSceneCommand)
export class DeleteSceneHandler implements ICommandHandler<DeleteSceneCommand> {
  constructor(private repository: SceneRepository) {}

  async execute({ id }: DeleteSceneCommand): Promise<void> {
    await this.repository.delete(id);
  }
}
