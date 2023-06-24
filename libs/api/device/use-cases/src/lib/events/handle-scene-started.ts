import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {SceneStartedEvent, SceneStartedSocketEvent} from "@smart-home/shared/scene/util-scene-event";
import {DeviceRepository} from "@smart-home/api/device/infrastructure";
import {WebsocketGateway} from "@smart-home/api/shared/infrastructure";

@EventsHandler(SceneStartedEvent)
export class SceneStartedHandler implements IEventHandler<SceneStartedEvent> {

    constructor(private repository: DeviceRepository, private websocket: WebsocketGateway) {
    }

    async handle(event: SceneStartedEvent): Promise<void> {
        await this.repository.handleSceneDevices(event.jobs)
        this.websocket.sendEventToClients(new SceneStartedSocketEvent(event.homeId))
    }

}