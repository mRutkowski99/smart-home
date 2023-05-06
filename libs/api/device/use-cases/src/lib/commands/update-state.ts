import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeviceRepository } from '@smart-home/api/device/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import { BadRequestException } from '@nestjs/common';

export class UpdateStateCommand {
  constructor(public readonly id: string, public readonly state: boolean) {}
}

@CommandHandler(UpdateStateCommand)
export class UpdateStateHandler
  implements ICommandHandler<UpdateStateCommand, void>
{
  constructor(
    private repository: DeviceRepository,
    private publisher: EventPublisher
  ) {}

  async execute({ id, state }: UpdateStateCommand): Promise<void> {
    const device = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(id),
        new BadRequestException("Device doesn't exist")
      )
    );

    device.changeState(state);
    device.commit();

    await this.repository.update(device);
  }
}
