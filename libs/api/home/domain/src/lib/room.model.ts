export interface RoomProps {
  id: string;
  name: string;
  devicesCount: number;
  imgUrl: string;
  isFavourite: boolean;
}

export class Room {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _devicesCount: number;
  private readonly _imgUrl: string;
  private readonly _isFavourite: boolean;

  constructor(props: RoomProps) {
    this._name = props.name;
    this._devicesCount = props.devicesCount;
    this._imgUrl = props.imgUrl;
    this._isFavourite = props.isFavourite;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get devicesCount(): number {
    return this._devicesCount;
  }

  get imgUrl(): string {
    return this._imgUrl;
  }

  get isFavourite(): boolean {
    return this._isFavourite;
  }
}
