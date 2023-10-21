import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeviceRepository } from '@smart-home/api/device/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import { BadRequestException, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ControlledValue } from '@prisma/client';
import { DeviceSetpointUpdated } from '@smart-home/shared/device/util-device-event';

export class UpdateSetpointCommand {
  constructor(
    public readonly id: string,
    public readonly value: number,
    public readonly homeId: string
  ) {}
}

@CommandHandler(UpdateSetpointCommand)
export class UpdateSetpointHandler
  implements ICommandHandler<UpdateSetpointCommand, void>
{
  constructor(
    private repository: DeviceRepository,
    private publisher: EventPublisher,
    @Inject('SMART-HUB') private smartHubClient: ClientKafka
  ) {}

  async execute({ id, value, homeId }: UpdateSetpointCommand): Promise<void> {
    const device = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(id),
        new BadRequestException("Device doesn't exist")
      )
    );

    try {
      device.createNewSetpoint(value);
    } catch (error) {
      throw new BadRequestException(error);
    }

    const address = device.getAddress(ControlledValue.WRITE_SETPOINT);
    this.smartHubClient.emit(
      DeviceSetpointUpdated.pattern,
      new DeviceSetpointUpdated(
        homeId,
        device.id.value,
        device.setpoint,
        address.address,
        address.addressType
      )
    );

    device.commit();

    await this.repository.updateSetpoint(device.id.value, device.setpoint)
  }
}
