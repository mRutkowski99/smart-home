import { AddressType } from '@prisma/client';

export class AlarmStateChangedEvent {
  static pattern = 'alarm_state_changed';

  constructor(
    public readonly homeId: string,
    public readonly address: string,
    public readonly addressType: AddressType,
    public readonly state: boolean
  ) {}

    toString() {
      return JSON.stringify(this)
    }
}
