import { AggregateRoot } from '@nestjs/cqrs';
import { Uuid } from '@smart-home/api/shared/domain';
import { AddressType } from '@prisma/client';

export class Alarm extends AggregateRoot {
  constructor(
    public readonly id: Uuid,
    public readonly homeId: Uuid,
    private _state: boolean,
    private _stateAddress: string,
    private _stateAddressType: AddressType,
    private _status: boolean,
    private _statusAddress: string,
    private _statusAddressType: AddressType
  ) {
    super();
  }

  get state(): boolean {
    return this._state;
  }

  set state(state: boolean) {
    this._state = state;
  }

    get stateAddress(): string {
        return this._stateAddress;
    }
    get stateAddressType(): AddressType {
        return this._stateAddressType;
    }

    updateStateAddress(address: string, addressType: AddressType) {
        this._stateAddress = address
        this._stateAddressType = addressType
    }

  get status(): boolean {
    return this._status;
  }

  set status(status: boolean) {
    this._status = status;
  }

    get statusAddress(): string {
        return this._statusAddress;
    }
    get statusAddressType(): AddressType {
        return this._statusAddressType;
    }

    updateStatusAddress(address: string, addressType: AddressType) {
        this._statusAddress = address
        this._statusAddressType = addressType
    }
}
