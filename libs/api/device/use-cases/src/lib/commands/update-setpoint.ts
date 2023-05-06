import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeviceRepository } from '@smart-home/api/device/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import { BadRequestException } from '@nestjs/common';

export class UpdateSetpointCommand {
  constructor(public readonly id: string, public readonly value: number) {}
}

@CommandHandler(UpdateSetpointCommand)
export class UpdateSetpointHandler
  implements ICommandHandler<UpdateSetpointCommand, void>
{
  constructor(
    private repository: DeviceRepository,
    private publisher: EventPublisher
  ) {}

  async execute({ id, value }: UpdateSetpointCommand): Promise<void> {
    const device = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(id),
        new BadRequestException("Device doesn't exist")
      )
    );

    try {
      device.createNewSetpoint(value);
    } catch (error: unknown) {
      throw new BadRequestException(error);
    }

    device.commit();

    await this.repository.update(device);
  }
}
