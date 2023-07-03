import { AggregateRoot } from '@nestjs/cqrs';
import {
  DeviceValueType,
  DigitalValue,
  Name,
  Percent,
  Temperature,
  Uuid,
} from '@smart-home/api/shared/domain';
import { DeviceAddress } from './device-address.model';
import { AddressType, ControlledValue } from '@prisma/client';
import * as crypto from 'crypto';

export class Device extends AggregateRoot {
  constructor(
    public readonly id: Uuid,
    public readonly roomId: Uuid,
    public name: Name,
    private _state: boolean,
    public readonly valueType: DeviceValueType,
    private _setpoint: number,
    private _addresses: DeviceAddress[]
  ) {
    super();
  }

  static create(
    roomId: string,
    name: string,
    valueType: DeviceValueType,
    addresses: {
      address: string;
      addressType: AddressType;
      controlledValue: ControlledValue;
    }[]
  ): Device {
    return new Device(
      new Uuid(crypto.randomUUID()),
      new Uuid(roomId),
      new Name(name),
      false,
      valueType,
      this.getDefaultSetpoint(valueType),
      addresses.map(
        (address) =>
          new DeviceAddress(
            crypto.randomUUID(),
            address.address,
            address.addressType,
            address.controlledValue
          )
      )
    );
  }

  static getDefaultSetpoint(valueType: DeviceValueType): number {
    if (valueType === DeviceValueType.DIGITAL) return DigitalValue.LOW_STATE;
    if (valueType === DeviceValueType.PERCENT) return 0;
    if (valueType === DeviceValueType.TEMPERATURE)
      return new Temperature(20).value;
    return 0;
  }

  updateAddress(
    address: string,
    addressType: AddressType,
    controlledValue: ControlledValue
  ) {
    if (this.addresses.some(a => a.controlledValue === controlledValue)) {
      this._addresses.map(a => a.controlledValue === controlledValue ? {...a, address, addressType} : a)
    } else {
     this._addresses = [...this.addresses, new DeviceAddress(crypto.randomUUID(), address, addressType, controlledValue)]
    }
  }

  get state(): boolean {
    return this._state;
  }

  set state(state: boolean) {
    this._state = state;
    //todo: dispatch event
  }

  getAddress(controlledValue: ControlledValue): DeviceAddress {
    return this.addresses.find(
      (address) => address.controlledValue === controlledValue
    );
  }

  get setpoint(): number {
    return this._setpoint;
  }

  get hasDigitalValue(): boolean {
    return this.valueType === DeviceValueType.DIGITAL;
  }

  get hasPercentValue(): boolean {
    return this.valueType === DeviceValueType.PERCENT;
  }

  get hasTemperatureValue(): boolean {
    return this.valueType === DeviceValueType.TEMPERATURE;
  }

  get addresses(): DeviceAddress[] {
    return this._addresses;
  }

  createNewSetpoint(value: number) {
    if (this.hasTemperatureValue) {
      this._setpoint = new Temperature(value).value;
    }

    if (this.hasPercentValue) {
      this._setpoint = new Percent(value).value;
    }

    if (this.hasDigitalValue) {
      this._setpoint = new DigitalValue(value).value;
      this.state = this._setpoint === DigitalValue.HIGH_STATE;
    }

    //todo: dispatch event
  }

  changeState(state: boolean) {
    this._state = state;

    if (this.hasDigitalValue) this._setpoint = DigitalValue.fromBoolean(state);

    //todo: dispatch event
  }
}
