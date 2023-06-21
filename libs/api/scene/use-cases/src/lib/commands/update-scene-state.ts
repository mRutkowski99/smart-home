import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import { throwIfNull } from '@smart-home/api/shared/util';
import {BadRequestException, Inject} from '@nestjs/common';
import {KafkaClient} from "kafka-node";
import {SceneActivatedEvent} from "@smart-home/shared/scene/util-scene-event";

export class UpdateSceneStateCommand {
  constructor(public readonly id: string, public readonly state: boolean, public readonly homeId: string) {}
}

@CommandHandler(UpdateSceneStateCommand)
export class UpdateSceneStateHandler
  implements ICommandHandler<UpdateSceneStateCommand>
{
  constructor(
    private repository: SceneRepository,
    private publisher: EventPublisher,
    @Inject('SMART-HUB') private smartHubClient: KafkaClient
  ) {}

  async execute({ state, id, homeId }: UpdateSceneStateCommand): Promise<void> {
    const scene = this.publisher.mergeObjectContext(
      throwIfNull(
        await this.repository.getById(id),
        new BadRequestException("Scene doesn't exist")
      )
    );

    try {
      scene.updateState(state);
    } catch (e) {
      throw new BadRequestException(e);
    }

    if (state) {
      this.smartHubClient.emit(SceneActivatedEvent.pattern, new SceneActivatedEvent(homeId, id))
    }

    scene.commit();
    await this.repository.updateState(scene.id.value, scene.state)
  }
}
