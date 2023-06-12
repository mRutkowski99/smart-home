import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { throwIfNull } from '@smart-home/api/shared/util';
import { BadRequestException } from '@nestjs/common';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';

export class RemoveControlledDeviceCommand {
  constructor(
    public readonly sceneId: string,
    public readonly deviceId: string
  ) {}
}

@CommandHandler(RemoveControlledDeviceCommand)
export class RemoveControlledDeviceHandler
  implements ICommandHandler<RemoveControlledDeviceCommand>
{
  constructor(
    private repository: SceneRepository,
    private publisher: EventPublisher
  ) {}

  async execute({
    sceneId,
    deviceId,
  }: RemoveControlledDeviceCommand): Promise<void> {
    const scene = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(sceneId),
        new BadRequestException("Scene doesn't exist")
      )
    );

    try {
      scene.removeControlledDevice(deviceId);
    } catch (e) {
      throw new BadRequestException(e);
    }

    scene.commit();
    await this.repository.update(scene);
  }
}
