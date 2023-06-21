import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import {BadRequestException, Inject} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {DeviceRepository} from "@smart-home/api/device/infrastructure";
import {SceneUpdatedEvent} from "@smart-home/shared/scene/util-scene-event";
import {sceneUpdatedEventMapper} from "../mappers/scene-updated-event.mapper";

export class UpdateControlledDeviceSetpointCommand {
  constructor(
    public readonly sceneId: string,
    public readonly deviceId: string,
    public readonly setpoint: number,
    public readonly homeId: string
  ) {}
}

@CommandHandler(UpdateControlledDeviceSetpointCommand)
export class UpdateControlledDeviceSetpointHandler
  implements ICommandHandler<UpdateControlledDeviceSetpointCommand>
{
  constructor(
    private repository: SceneRepository,
    private publisher: EventPublisher,
    @Inject('SMART-HUB') private smartHubClient: ClientKafka,
    private deviceRepository: DeviceRepository
  ) {}

  async execute({
    setpoint,
    deviceId,
    sceneId,
      homeId
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

    const devices = await this.deviceRepository.getAll(homeId)

    this.smartHubClient.emit(SceneUpdatedEvent.pattern, sceneUpdatedEventMapper(homeId, scene, devices))

    scene.commit();
    await this.repository.updateControlledDeviceSetpoint(sceneId, deviceId, setpoint)
  }
}
