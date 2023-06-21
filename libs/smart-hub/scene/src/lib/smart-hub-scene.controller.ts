import { Controller } from '@nestjs/common';
import { SmartHubSceneService } from './smart-hub-scene.service';
import {EventPattern} from "@nestjs/microservices";
import {SceneActivatedEvent, SceneCreatedEvent, SceneDeletedEvent, SceneUpdatedEvent} from "@smart-home/shared/scene/util-scene-event";

@Controller('smart-hub-scene')
export class SmartHubSceneController {
  constructor(private smartHubSceneService: SmartHubSceneService) {}

  @EventPattern(SceneCreatedEvent.pattern)
  handleSceneCreated(event: SceneCreatedEvent) {
    this.smartHubSceneService.handleSceneCreated(event)
  }

  @EventPattern(SceneActivatedEvent.pattern)
  handleSceneActivated(event: SceneActivatedEvent) {
    this.smartHubSceneService.handleSceneActivated(event.sceneId)
  }

  @EventPattern(SceneDeletedEvent.pattern)
  handleSceneDeleted(event: SceneDeletedEvent) {
    this.smartHubSceneService.handleSceneDeleted(event.sceneId)
  }

  @EventPattern(SceneUpdatedEvent.pattern)
  handleSceneUpdated(event: SceneUpdatedEvent) {
    this.smartHubSceneService.handleSceneUpdated(event)
  }
}
