import { AggregateRoot } from '@nestjs/cqrs';
import { Name, Uuid } from '@smart-home/api/shared/util-value-objects';

export class Room extends AggregateRoot {
  constructor(
    private readonly _id: Uuid,
    private readonly _homeId: Uuid,
    private _name: Name,
    private _imgUrl: string
  ) {
    super();
  }

  get id(): Uuid {
    return this._id;
  }

  get homeId(): Uuid {
    return this._homeId;
  }

  get name(): Name {
    return this._name;
  }

  set name(value: Name) {
    this._name = value;
  }

  get imgUrl(): string {
    return this._imgUrl;
  }

  set imgUrl(value: string) {
    this._imgUrl = value;
  }
}
