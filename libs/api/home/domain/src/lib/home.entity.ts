import { AggregateRoot } from '@nestjs/cqrs';
import { Room, RoomProps } from './room.model';
import { Scene, SceneProps } from './scene.model';

export class Home extends AggregateRoot {
  private readonly _rooms: Room[];
  private readonly _scenes: Scene[];

  constructor(
    private readonly _id: string,
    rooms: RoomProps[],
    scenes: SceneProps[]
  ) {
    super();

    this._rooms = rooms.map((room) => new Room(room));
    this._scenes = scenes.map((scene) => new Scene(scene));
  }

  get id(): string {
    return this._id;
  }

  get rooms(): Room[] {
    return [...this.rooms];
  }

  get scenes(): Scene[] {
    return [...this.scenes];
  }
}
