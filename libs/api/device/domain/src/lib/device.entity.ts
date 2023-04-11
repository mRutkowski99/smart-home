import { AggregateRoot } from '@nestjs/cqrs';
import {
  DeviceValueType,
  DigitalValue,
  Name,
  Percent,
  Temperature,
  Uuid,
} from '@smart-home/api/shared/domain';

export class Device<TValue> extends AggregateRoot {
  constructor(
    public readonly id: Uuid,
    public readonly roomId: Uuid,
    public name: Name,
    private _state: boolean,
    public readonly valueType: DeviceValueType,
    private _setpoint: TValue
  ) {
    super();

    if (
      (valueType === DeviceValueType.DIGITAL &&
        !(_setpoint instanceof DigitalValue)) ||
      (valueType === DeviceValueType.PERCENT &&
        !(_setpoint instanceof Percent)) ||
      (valueType === DeviceValueType.TEMPERATURE &&
        !(_setpoint instanceof Temperature))
    )
      throw new Error('Provided setpoint has wrong valueType');
  }

  get state(): boolean {
    return this._state;
  }

  set state(state: boolean) {
    this._state = state;
    //todo: dispatch event
  }

  get setpoint(): TValue {
    return this._setpoint;
  }

  set setpoint(setpoint: TValue) {
    this._setpoint = setpoint;
    //todo: dispatch event
  }

  hasDigitalValue(): this is Device<DigitalValue> {
    return this.valueType === DeviceValueType.DIGITAL;
  }

  hasPercentValue(): this is Device<Percent> {
    return this.valueType === DeviceValueType.PERCENT;
  }

  hasTemperatureValue(): this is Device<Temperature> {
    return this.valueType === DeviceValueType.TEMPERATURE;
  }
}
