import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DeviceRepository } from '@smart-home/api/device/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import { BadRequestException, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { DeviceStateUpdatedEvent } from '@smart-home/shared/device/util-device-event';
import {AddressType, ControlledValue} from '@prisma/client';
import {WebsocketGateway} from "@smart-home/api/shared/infrastructure";
import {SceneStartedSocketEvent} from "@smart-home/shared/scene/util-scene-event";

export class UpdateStateCommand {
  constructor(
    public readonly id: string,
    public readonly state: boolean,
    public readonly homeId: string
  ) {}
}

@CommandHandler(UpdateStateCommand)
export class UpdateStateHandler
  implements ICommandHandler<UpdateStateCommand, void>
{
  constructor(
    private repository: DeviceRepository,
    private publisher: EventPublisher,
    @Inject('SMART-HUB') private smartHubClient: ClientKafka,
    private websocket: WebsocketGateway
  ) {}

  async execute({ id, state, homeId }: UpdateStateCommand): Promise<void> {
    const device = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(id),
        new BadRequestException("Device doesn't exist")
      )
    );

    device.changeState(state);
    const address = device.getAddress(ControlledValue.WRITE_STATE)

    this.smartHubClient.emit(
      DeviceStateUpdatedEvent.pattern,
      new DeviceStateUpdatedEvent(
        homeId,
        id,
        state,
        address.address,
        AddressType.DO
      )
    );

    await this.repository.updateState(device.id.value, device.state)
    this.websocket.sendEventToClients(new SceneStartedSocketEvent(device.id.value))
  }
}
