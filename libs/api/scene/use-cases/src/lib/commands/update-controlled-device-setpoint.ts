import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import { BadRequestException } from '@nestjs/common';

export class UpdateControlledDeviceSetpointCommand {
  constructor(
    public readonly sceneId: string,
    public readonly deviceId: string,
    public readonly setpoint: number
  ) {}
}

@CommandHandler(UpdateControlledDeviceSetpointCommand)
export class UpdateControlledDeviceSetpointHandler
  implements ICommandHandler<UpdateControlledDeviceSetpointCommand>
{
  constructor(
    private repository: SceneRepository,
    private publisher: EventPublisher
  ) {}

  async execute({
    setpoint,
    deviceId,
    sceneId,
  }: UpdateControlledDeviceSetpointCommand): Promise<void> {
    const scene = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(sceneId),
        new BadRequestException("Scene doesn't exist")
      )
    );

    try {
      scene.updateControlledDeviceSetpoint(deviceId, setpoint);
    } catch (e) {
      throw new BadRequestException(e);
    }

    scene.commit();
    await this.repository.update(scene);
  }
}
