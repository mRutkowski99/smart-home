import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { throwIfNull } from '@smart-home/api/shared/util';
import {BadRequestException, Inject} from '@nestjs/common';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import {ClientKafka} from "@nestjs/microservices";
import {DeviceRepository} from "@smart-home/api/device/infrastructure";
import {SceneUpdatedEvent} from "@smart-home/shared/scene/util-scene-event";
import {sceneUpdatedEventMapper} from "../mappers/scene-updated-event.mapper";

export class RemoveControlledDeviceCommand {
  constructor(
    public readonly sceneId: string,
    public readonly deviceId: string,
    public readonly homeId: string
  ) {}
}

@CommandHandler(RemoveControlledDeviceCommand)
export class RemoveControlledDeviceHandler
  implements ICommandHandler<RemoveControlledDeviceCommand>
{
  constructor(
    private repository: SceneRepository,
    private publisher: EventPublisher,
    @Inject('SMART-HUB') private smartHubClient: ClientKafka,
    private deviceRepository: DeviceRepository
  ) {}

  async execute({
    sceneId,
    deviceId,
      homeId
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

    const devices = await this.deviceRepository.getAll(homeId)

    this.smartHubClient.emit(SceneUpdatedEvent.pattern, sceneUpdatedEventMapper(homeId, scene, devices))

    scene.commit();
    await this.repository.removeControlledDevice(sceneId, deviceId)
  }
}
