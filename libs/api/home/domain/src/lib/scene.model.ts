export interface SceneProps {
  id: string;
  name: string;
  isActive: boolean;
  isFavourite: boolean;
}

export class Scene {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _isActive: boolean;
  private readonly _isFavourite: boolean;

  constructor(props: SceneProps) {
    this._id = props.id;
    this._name = props.name;
    this._isActive = props.isActive;
    this._isFavourite = props.isFavourite;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get isFavourite(): boolean {
    return this._isFavourite;
  }
}
