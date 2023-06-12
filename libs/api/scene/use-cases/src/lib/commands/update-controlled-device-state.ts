import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import { BadRequestException } from '@nestjs/common';

export class UpdateControlledDeviceStateCommand {
  constructor(
    public readonly sceneId: string,
    public readonly deviceId: string,
    public readonly state: boolean
  ) {}
}

@CommandHandler(UpdateControlledDeviceStateCommand)
export class UpdateControlledDeviceStateHandler
  implements ICommandHandler<UpdateControlledDeviceStateCommand>
{
  constructor(
    private repository: SceneRepository,
    private publisher: EventPublisher
  ) {}

  async execute({
    sceneId,
    state,
    deviceId,
  }: UpdateControlledDeviceStateCommand): Promise<void> {
    const scene = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(sceneId),
        new BadRequestException("Scene doesn't exist")
      )
    );

    try {
      scene.updateControlledDeviceState(deviceId, state);
    } catch (e) {
      throw new BadRequestException(e);
    }

    scene.commit();
    await this.repository.update(scene);
  }
}
