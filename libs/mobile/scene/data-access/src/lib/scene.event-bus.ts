import { Injectable } from '@angular/core';
import { Event, EventBus } from '@smart-home/mobile/shared/util';

export enum SceneEvents {
  ScheduleSuccessfullyUpdated = 'Schedule Successfully Updated',
}

export class ScheduleSuccessfullyUpdated implements Event<SceneEvents> {
  readonly name = SceneEvents.ScheduleSuccessfullyUpdated;
}

@Injectable()
export class SceneEventBus extends EventBus<SceneEvents> {}
