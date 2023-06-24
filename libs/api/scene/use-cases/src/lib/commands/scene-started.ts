import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {SceneRepository} from "@smart-home/api/scene/infrastructure";
import {throwIfNull} from "@smart-home/api/shared/util";
import {BadRequestException} from "@nestjs/common";
import {WebsocketGateway} from "@smart-home/api/shared/infrastructure";
import {SceneStartedSocketEvent} from "@smart-home/shared/scene/util-scene-event";

export class SceneStartedCommand {
    constructor(public readonly sceneId: string, public readonly homeId: string) {
    }
}

@CommandHandler(SceneStartedCommand)
export class SceneStartedHandler implements ICommandHandler<SceneStartedCommand> {
    constructor(private repository: SceneRepository, private publisher: EventPublisher, private websocket: WebsocketGateway) {
    }

    async execute({sceneId, homeId}: SceneStartedCommand): Promise<void> {
        const scene = this.publisher.mergeObjectContext(
            throwIfNull(
                await this.repository.getById(sceneId),
                new BadRequestException('Scene doesn\'t exist')
            )
        )

        try {
            scene.updateState(true)
        } catch (e) {
            throw new BadRequestException(e)
        }

        scene.commit()
        await this.repository.updateState(scene.id.value, scene.state)
        this.websocket.sendEventToClients(new SceneStartedSocketEvent(scene.homeId.value))
    }

}