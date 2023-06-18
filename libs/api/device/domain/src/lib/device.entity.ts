import { AggregateRoot } from '@nestjs/cqrs';
import {
  DeviceValueType,
  DigitalValue,
  Name,
  Percent,
  Temperature,
  Uuid,
} from '@smart-home/api/shared/domain';
import {DeviceAddress} from "./device-address.model";
import {ControlledValue} from "@prisma/client";

export class Device extends AggregateRoot {
  constructor(
    public readonly id: Uuid,
    public readonly roomId: Uuid,
    public name: Name,
    private _state: boolean,
    public readonly valueType: DeviceValueType,
    private _setpoint: number,
    public readonly addresses: DeviceAddress[]
  ) {
    super();
  }

  get state(): boolean {
    return this._state;
  }

  set state(state: boolean) {
    this._state = state;
    //todo: dispatch event
  }

  getAddress(controlledValue: ControlledValue): DeviceAddress {
    return this.addresses.find(address => address.controlledValue === controlledValue)
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
