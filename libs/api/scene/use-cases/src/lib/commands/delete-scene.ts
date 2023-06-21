import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SceneRepository } from '@smart-home/api/scene/infrastructure';
import {Inject} from "@nestjs/common";
import {KafkaClient} from "kafka-node";
import {SceneDeletedEvent} from "@smart-home/shared/scene/util-scene-event";

export class DeleteSceneCommand {
  constructor(public readonly id: string, public readonly homeId: string) {}
}

@CommandHandler(DeleteSceneCommand)
export class DeleteSceneHandler implements ICommandHandler<DeleteSceneCommand> {
  constructor(private repository: SceneRepository, @Inject('SMART-HUB') private smartHubClient: KafkaClient) {}

  async execute({ id, homeId }: DeleteSceneCommand): Promise<void> {
    await this.repository.delete(id);
    this.smartHubClient.emit(SceneDeletedEvent.pattern, new SceneDeletedEvent(homeId, id))
  }
}
