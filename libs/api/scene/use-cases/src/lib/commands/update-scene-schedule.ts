import { DayOfWeek, Time } from '@smart-home/shared/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import {BadRequestException, Inject} from '@nestjs/common';
import {KafkaClient} from "kafka-node";
import {DeviceRepository} from "@smart-home/api/device/infrastructure";
import {SceneUpdatedEvent} from "@smart-home/shared/scene/util-scene-event";
import {sceneUpdatedEventMapper} from "../mappers/scene-updated-event.mapper";

interface Schedule {
  day: DayOfWeek;
  time: Time;
}

export class UpdateSceneScheduleCommand {
  constructor(
    public readonly id: string,
    public readonly active: boolean,
    public readonly schedule: Schedule[],
    public readonly homeId: string
  ) {}
}

@CommandHandler(UpdateSceneScheduleCommand)
export class UpdateSceneScheduleHandler
  implements ICommandHandler<UpdateSceneScheduleCommand, void>
{
  constructor(
    private repository: SceneRepository,
    private publisher: EventPublisher,
    @Inject('SMART-HUB') private smartHubClient: KafkaClient,
    private deviceRepository: DeviceRepository
  ) {}

  async execute(command: UpdateSceneScheduleCommand): Promise<void> {
    const scene = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(command.id),
        new BadRequestException("Scene doesn't exist")
      )
    );

    try {
      scene.updateSchedule(command.active, command.schedule);
    } catch (error: unknown) {
      throw new BadRequestException(error);
    }

    const devices = await this.deviceRepository.getAll(command.homeId)

    this.smartHubClient.emit(SceneUpdatedEvent.pattern, sceneUpdatedEventMapper(command.homeId, scene, devices))

    scene.commit();
    await this.repository.update(scene);
  }
}
