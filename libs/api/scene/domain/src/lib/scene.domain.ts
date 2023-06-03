import { AggregateRoot } from '@nestjs/cqrs';
import { Name, Uuid } from '@smart-home/api/shared/domain';
import { SceneSchedule } from './scene-schedule.model';
import { ControlledDevice } from './controlled-device.model';

export class Scene extends AggregateRoot {
  constructor(
    public readonly id: Uuid,
    public readonly homeId: Uuid,
    public name: Name,
    private _state: boolean,
    private _schedule: SceneSchedule | null,
    private _controlledDevices: ControlledDevice[]
  ) {
    super();
  }

  get state(): boolean {
    return this._state;
  }

  get schedule(): SceneSchedule | null {
    return this._schedule;
  }

  get scheduledForToday(): boolean {
    return this.schedule?.isScheduledForDay(new Date().getDay()) ?? false;
  }

  get controlledDevices(): ControlledDevice[] {
    return this._controlledDevices;
  }
}
