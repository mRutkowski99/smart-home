import {Job} from "@smart-home/smart-hub/common";

export class SceneCreatedEvent {
  static pattern = 'scene_created';

  constructor(
    public readonly homeId: string,
    public readonly sceneId: string,
    public readonly cron: string[],
    public readonly scheduleActivated: boolean,
    public readonly jobs: Job[]
  ) {}

    toString() {
      return JSON.stringify(this)
    }
}
