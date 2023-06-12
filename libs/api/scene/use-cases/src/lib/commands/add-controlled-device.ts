import { DeviceValueType } from '@smart-home/shared/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import { BadRequestException } from '@nestjs/common';

export class AddControlledDeviceCommand {
  constructor(
    readonly sceneId: string,
    readonly deviceId: string,
    readonly setpoint: number,
    readonly state: boolean,
    readonly valueType: DeviceValueType
  ) {}
}

@CommandHandler(AddControlledDeviceCommand)
export class AddControlledDeviceHandler
  implements ICommandHandler<AddControlledDeviceCommand>
{
  constructor(
    private repository: SceneRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: AddControlledDeviceCommand): Promise<void> {
    const scene = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(command.sceneId),
        new BadRequestException("Scene doesn't exist")
      )
    );

    try {
      scene.addControlledDevice(
        command.deviceId,
        command.setpoint,
        command.state,
        command.valueType
      );
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }

    scene.commit();
    await this.repository.update(scene);
  }
}
