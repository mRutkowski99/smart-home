export class SafetyDeviceDisabledEvent {
  constructor(public readonly homeId: string, public readonly id: string) {}
}
