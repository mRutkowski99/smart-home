export enum SafetyDeviceEnum {
  WaterLeakSensor,
  COSensor,
  SmokeSensor,
}

export class SafetyDevice {
  constructor(public readonly type: SafetyDeviceEnum) {}

  toString() {
    switch (this.type) {
      case SafetyDeviceEnum.WaterLeakSensor:
        return 'Water leak sensor';
      case SafetyDeviceEnum.COSensor:
        return 'CO sensor';
      case SafetyDeviceEnum.SmokeSensor:
        return 'Smoke sensor';
      default:
        return '';
    }
  }
}
