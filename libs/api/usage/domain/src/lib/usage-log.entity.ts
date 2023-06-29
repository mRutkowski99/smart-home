import { Uuid } from '@smart-home/api/shared/domain';

export class UsageLog {
  constructor(
    public readonly id: Uuid,
    public readonly homeId: Uuid,
    public readonly date: Date,
    public readonly value: number
  ) {}
}
