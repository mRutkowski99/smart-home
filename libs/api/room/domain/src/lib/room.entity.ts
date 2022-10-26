import { AggregateRoot } from '@nestjs/cqrs';
import { Humidity } from './humidity.model';
import { Temperature } from './temperature.model';

export class Room extends AggregateRoot {
  private readonly _temperature: Temperature;
  private readonly _humidity: Humidity;

  constructor(
    private readonly _id: string,
    private readonly _homeId: string,
    private readonly _name: string,
    _temperature: number,
    _humidity: number,
    private readonly _imgUrl: string,
    private readonly _favourite: boolean
  ) {
    super();
    this._temperature = new Temperature(_temperature);
    this._humidity = new Humidity(_humidity);
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

  get temperature(): number {
    return this._temperature.value;
  }

  get humidity(): number {
    return this._humidity.value;
  }

  get imgUrl(): string {
    return this._imgUrl;
  }

  get isFavourite(): boolean {
    return this._favourite;
  }
}
