import { AggregateRoot } from '@nestjs/cqrs';
import { Humidity } from './humidity.model';
import { Temperature } from './temperature.model';

export class Room extends AggregateRoot {
  private readonly _temperature: Temperature | undefined;
  private readonly _humidity: Humidity | undefined;

  constructor(
    private readonly _id: string,
    private readonly _homeId: string,
    private readonly _name: string,
    private readonly _imgUrl: string,
    private _favourite: boolean,
    _temperature?: number,
    _humidity?: number
  ) {
    super();

    //These properties don't comes from db so can be omitted unless are necessary
    if (_temperature !== undefined)
      this._temperature = new Temperature(_temperature);

    if (_humidity !== undefined) this._humidity = new Humidity(_humidity);
  }

  get id(): string {
    return this._id;
  }

  get homeId(): string {
    return this._homeId;
  }

  get name(): string {
    return this._name;
  }

  get temperature(): number | undefined {
    return this._temperature?.value;
  }

  get humidity(): number | undefined {
    return this._humidity?.value;
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
