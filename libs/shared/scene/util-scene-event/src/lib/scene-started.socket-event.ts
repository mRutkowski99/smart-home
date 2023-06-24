
export class SceneStartedSocketEvent {
    static pattern = 'socket_scene_started'

    constructor(public readonly homeId: string) {
    }
}