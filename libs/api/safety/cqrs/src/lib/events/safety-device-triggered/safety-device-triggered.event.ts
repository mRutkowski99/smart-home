export class SafetyDeviceTriggeredEvent {
  constructor(public readonly homeId: string, public readonly id: string) {}
}
