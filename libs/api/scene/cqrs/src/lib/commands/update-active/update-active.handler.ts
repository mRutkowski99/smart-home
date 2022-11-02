import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  SceneRepository,
  SceneSchemaFactory,
} from '@smart-home/api/scene/infrastructure';
import { UpdateActiveCommand } from './update-active.command';

@CommandHandler(UpdateActiveCommand)
export class UpdateActiveHandler
  implements ICommandHandler<UpdateActiveCommand>
{
  constructor(
    private readonly repository: SceneRepository,
    private readonly factory: SceneSchemaFactory,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: UpdateActiveCommand): Promise<void> {
    const { id, value } = command;

    const scene = this.eventPublisher.mergeObjectContext(
      this.factory.createFromSchema(await this.repository.findById(id))
    );

    value ? scene.enable() : scene.disable();
    scene.commit();

    await this.repository.findAndReplace(scene.id, this.factory.create(scene));
  }
}
