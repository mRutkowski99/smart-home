import {
  DeviceValueType,
  DigitalValue,
  Name,
  Percent,
  Temperature,
  Uuid,
} from '@smart-home/api/shared/domain';

export class ControlledDevice {
  constructor(
    public readonly id: Uuid,
    public readonly deviceId: Uuid,
    public readonly deviceName: Name,
    public readonly valueType: DeviceValueType,
    private _setpoint: number,
    private _state: boolean
  ) {}

  get setpoint(): number {
    return this._setpoint;
  }

  get state(): boolean {
    return this._state;
  }

  private get hasDigitalValue(): boolean {
    return this.valueType === DeviceValueType.DIGITAL;
  }

  private get hasPercentValue(): boolean {
    return this.valueType === DeviceValueType.PERCENT;
  }

  private get hasTemperatureValue(): boolean {
    return this.valueType === DeviceValueType.TEMPERATURE;
  }

  setValue(setpoint: number, state: boolean) {
    const validated = this.validate(setpoint, state);
    this._setpoint = validated.setpoint;
    this._state = validated.state;
  }

  private validate(
    setpoint: number,
    state: boolean
  ): { setpoint: number; state: boolean } {
    if (this.hasTemperatureValue) {
      return { setpoint: new Temperature(setpoint).value, state };
    }

    if (this.hasPercentValue) {
      return { setpoint: new Percent(setpoint).value, state };
    }

    if (this.hasDigitalValue) {
      return {
        setpoint: new DigitalValue(setpoint).value,
        state: setpoint === DigitalValue.HIGH_STATE,
      };
    }

    throw new Error('Invalid value type');
  }
}
