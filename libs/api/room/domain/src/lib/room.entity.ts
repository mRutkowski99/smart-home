import { AggregateRoot } from '@nestjs/cqrs';

export class Room extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly homeId: string,
    private readonly _name: string,
    private readonly _imgUrl: string,
    private _favourite: boolean
  ) {
    super();
  }

  get name(): string {
    return this._name;
  }

  get imgUrl(): string {
    return this._imgUrl;
  }

  get isFavourite(): boolean {
    return this._favourite;
  }

  addToFavourites() {
    if (this._favourite) throw new Error('Room is already in favourites');

    this._favourite = true;
  }

  removeFromFavourites() {
    if (!this._favourite) throw new Error("Room isn't in favourites");

    this._favourite = false;
  }
}
