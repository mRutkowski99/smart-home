
export class SceneActivatedEvent {
    static pattern = 'scene_activated'

    constructor(public readonly homeId: string, public readonly sceneId: string) {
    }

    toString() {
        return JSON.stringify(this)
    }
}