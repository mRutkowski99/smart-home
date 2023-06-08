import { Injectable } from '@angular/core';
import { DayOfWeek, Time } from '@smart-home/shared/util';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { UiSceneSchedule } from './ui-scene-schedule.interface';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';

interface ScheduleDay {
  dayOfWeek: DayOfWeek;
  time: Time | null;
}

export interface SchedulePresenter {
  active: boolean;
  days: ScheduleDay[];
  selectedDay: DayOfWeek;
  selectedDayTime: Time | null;
}

const initialState: SchedulePresenter = {
  active: true,
  days: [
    { dayOfWeek: DayOfWeek.Monday, time: null },
    { dayOfWeek: DayOfWeek.Tuesday, time: null },
    { dayOfWeek: DayOfWeek.Wednesday, time: null },
    { dayOfWeek: DayOfWeek.Thursday, time: null },
    { dayOfWeek: DayOfWeek.Friday, time: null },
    { dayOfWeek: DayOfWeek.Saturday, time: null },
    { dayOfWeek: DayOfWeek.Sunday, time: null },
  ],
  selectedDay: DayOfWeek.Monday,
  selectedDayTime: null,
};

@Injectable()
export class UiSceneSchedulePresenter {
  private _schedule = new BehaviorSubject<SchedulePresenter>(initialState);
  readonly schedule$ = this._schedule.asObservable();
  private _hasChanged = new BehaviorSubject<boolean>(false);
  readonly hasChanged$ = this._hasChanged
    .asObservable()
    .pipe(distinctUntilChanged());

  get updateSchedulePayload(): UpdateSceneSchedulePayload {
    const currentValue = this._schedule.getValue();
    return <UpdateSceneSchedulePayload>{
      active: currentValue.active,
      days: currentValue.days.filter((day) => day.time !== null),
    };
  }

  get selectedDayTime(): Time | null {
    return this._schedule.getValue().selectedDayTime;
  }

  updateSchedule(schedule: UiSceneSchedule) {
    this._schedule.next({
      active: schedule.active,
      days: initialState.days.map((day) => ({
        dayOfWeek: day.dayOfWeek,
        time: this.findTimeInDaysCollection(schedule.days, day.dayOfWeek),
      })),
      selectedDay: DayOfWeek.Monday,
      selectedDayTime: this.findTimeInDaysCollection(
        schedule.days,
        DayOfWeek.Monday
      ),
    });
  }

  changeSelectedDay(day: DayOfWeek) {
    const currentValue = this._schedule.getValue();
    this._schedule.next({
      ...currentValue,
      selectedDay: day,
      selectedDayTime: this.findTimeInDaysCollection(currentValue.days, day),
    });
  }

  clearTime() {
    const currentValue = this._schedule.getValue();
    this._schedule.next({
      ...currentValue,
      days: this.changeTimeOfDayInCollection(
        currentValue.days,
        currentValue.selectedDay,
        null
      ),
      selectedDayTime: null,
    });
    this._hasChanged.next(true);
  }

  updateTime(time: Time) {
    const currentValue = this._schedule.getValue();
    this._schedule.next({
      ...currentValue,
      days: this.changeTimeOfDayInCollection(
        currentValue.days,
        currentValue.selectedDay,
        time
      ),
      selectedDayTime: time,
    });
    this._hasChanged.next(true);
  }

  updateActive(active: boolean) {
    const currentValue = this._schedule.getValue();
    this._schedule.next({
      ...currentValue,
      active,
    });
    this._hasChanged.next(true);
  }

  hideSubmitButton() {
    this._hasChanged.next(false);
  }

  private findTimeInDaysCollection(
    collection: ScheduleDay[],
    day: DayOfWeek
  ): Time | null {
    return collection.find((item) => item.dayOfWeek === day)?.time ?? null;
  }

  private changeTimeOfDayInCollection(
    collection: ScheduleDay[],
    day: DayOfWeek,
    time: Time | null
  ): ScheduleDay[] {
    return collection.map((scheduleDay) =>
      scheduleDay.dayOfWeek === day
        ? { dayOfWeek: scheduleDay.dayOfWeek, time }
        : scheduleDay
    );
  }
}
