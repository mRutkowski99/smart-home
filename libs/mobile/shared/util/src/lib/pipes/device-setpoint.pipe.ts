import { Pipe, PipeTransform } from '@angular/core';
import { DeviceValueType } from '@smart-home/shared/util';
import { PercentPipe, TemperaturePipe } from '@smart-home/mobile/shared/util';

export interface DeviceSetpointPipeOptions {
  fahrenheit: boolean;
}

interface DeviceValue {
  setpoint: number;
  valueType: DeviceValueType;
}

@Pipe({ name: 'deviceSetpoint', standalone: true })
export class DeviceSetpointPipe implements PipeTransform {
  private readonly percentPipeTransform = new PercentPipe().transform;
  private readonly temperaturePipeTransform = new TemperaturePipe().transform;

  transform(
    value: DeviceValue,
    options?: Partial<DeviceSetpointPipeOptions>
  ): string {
    if (value.valueType === 'DIGITAL')
      return value.setpoint === 1 ? 'ON' : 'OFF';

    if (value.valueType === 'PERCENT')
      return this.percentPipeTransform(value.setpoint) ?? '--';

    if (value.valueType === 'TEMPERATURE')
      return (
        this.temperaturePipeTransform(value.setpoint, options?.fahrenheit) ??
        '--'
      );

    throw new Error('Provided wrong valueType');
  }
}
