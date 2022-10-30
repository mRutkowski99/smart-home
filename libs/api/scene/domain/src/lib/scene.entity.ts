import { AggregateRoot } from '@nestjs/cqrs';
import { Schedule } from './schedule.model';

export class Scene extends AggregateRoot {
  private readonly _schedule: Schedule | null;

  constructor(
    private readonly _id: string,
    private readonly _homeId: string,
    private readonly _name: string,
    private _active: boolean,
    private _favourite: boolean,
    cron: string | null,
    expireDate: Date | null
  ) {
    super();

    if (cron === null || expireDate === null) this._schedule = null;
    else this._schedule = new Schedule(cron!, expireDate!);

    if (this._schedule?.isExpired) this.removeExpiredSchedule();
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

  get isActive(): boolean {
    return this._active;
  }

  get isFavourite(): boolean {
    return this._favourite;
  }

  get schedule(): Schedule | null {
    return this._schedule;
  }

  addToFavourites() {
    if (this._favourite) throw new Error('Scene is already in favourites');

    this._favourite = true;
  }

  removeFromFavourites() {
    if (!this._favourite) throw new Error('Scene is not in favourites');

    this._favourite = false;
  }

  enable() {
    if (this._active) throw new Error('Scene is already enabled');

    this._active = true;
    //todo: send event
  }

  disable() {
    if (!this._active) throw new Error('Scene is already disabled');

    this._active = false;
    //todo: send event
  }

  private removeExpiredSchedule() {
    //todo: send event
  }
}
