import { Time } from '@smart-home/api/core/utils';

export class SceneOverviewDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly isActive: boolean,
    public readonly isFavourite: boolean,
    public readonly todaySchedule: Time
  ) {}
}
