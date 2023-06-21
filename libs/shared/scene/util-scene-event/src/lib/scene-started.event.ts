
export class SceneStartedEvent {
    static pattern = 'scene_started'

    constructor(public readonly homeId: string, public readonly sceneId: string) {
    }
}