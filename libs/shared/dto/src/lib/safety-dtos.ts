import { SafetyState } from '@smart-home/api/safety/domain';

export class SafetyDto {
  constructor(
    public readonly id: string,
    public readonly homeId: string,
    public readonly name: string,
    public readonly device: string,
    public readonly state: SafetyState,
    public readonly stateName: string
  ) {}
}

export class SafetyLogDto {
  constructor(
    public readonly id: string,
    public readonly safetyId: string,
    public readonly createDate: Date,
    public readonly state: SafetyState,
    public readonly message: string,
    public readonly confirmed: boolean | null,
    public readonly confirmedAt: Date | null,
    public readonly confirmedBy: string | null
  ) {}
}

export class SafetyWithLogsDto {
  constructor(
    public readonly id: string,
    public readonly homeId: string,
    public readonly name: string,
    public readonly logs: SafetyLogDto[]
  ) {}
}
