import { Time } from '@smart-home/shared/util';

export interface UiSceneCardInterface {
  readonly id: string;
  readonly name: string;
  readonly state: boolean;
  readonly scheduledForToday: boolean;
  readonly startTime?: Time;
}
