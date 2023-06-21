
export class SceneDeletedEvent {
    static pattern = 'scene_deleted'

    constructor(public readonly homeId: string, public readonly sceneId: string) {
    }

    toString() {
        return JSON.stringify(this)
    }
}