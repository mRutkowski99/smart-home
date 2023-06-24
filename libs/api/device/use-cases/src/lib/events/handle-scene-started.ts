import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {SceneStartedEvent} from "@smart-home/shared/scene/util-scene-event";
import {DeviceRepository} from "@smart-home/api/device/infrastructure";

@EventsHandler(SceneStartedEvent)
export class SceneStartedHandler implements IEventHandler<SceneStartedEvent> {

    constructor(private repository: DeviceRepository) {
    }

    async handle(event: SceneStartedEvent): Promise<void> {
        await this.repository.handleSceneDevices(event.jobs)
    }

}