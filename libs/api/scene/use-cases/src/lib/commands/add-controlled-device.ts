import { DeviceValueType } from '@smart-home/shared/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import {BadRequestException, Inject} from '@nestjs/common';
import {KafkaClient} from "kafka-node";
import {SceneUpdatedEvent} from "@smart-home/shared/scene/util-scene-event";
import {sceneUpdatedEventMapper} from "../mappers/scene-updated-event.mapper";
import {DeviceRepository} from "@smart-home/api/device/infrastructure";

export class AddControlledDeviceCommand {
  constructor(
    readonly sceneId: string,
    readonly deviceId: string,
    readonly setpoint: number,
    readonly state: boolean,
    readonly valueType: DeviceValueType,
    readonly homeId: string
  ) {}
}

@CommandHandler(AddControlledDeviceCommand)
export class AddControlledDeviceHandler
  implements ICommandHandler<AddControlledDeviceCommand>
{
  constructor(
    private repository: SceneRepository,
    private deviceRepository: DeviceRepository,
    private publisher: EventPublisher,
    @Inject('SMART-HUB') private smartHubClient: KafkaClient
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
      throw new BadRequestException(e);
    }

    const devices = await this.deviceRepository.getAll(command.homeId)

    this.smartHubClient.emit(SceneUpdatedEvent.pattern, sceneUpdatedEventMapper(command.homeId, scene, devices))

    scene.commit();
    await this.repository.addControlledDevice(scene.id.value, command.deviceId, command.setpoint, command.state)
  }
}
