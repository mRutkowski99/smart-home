import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSceneSchedule } from './ui-scene-schedule.interface';
import { UiSceneSchedulePresenter } from './mobile-scene-ui-scene-schedule.presenter';
import { CheckboxCustomEvent, IonicModule } from '@ionic/angular';
import { DayOfWeek, Time } from '@smart-home/shared/util';
import { UpdateSceneSchedulePayload } from '@smart-home/shared/scene/util-scene-payload';
import { MobileSharedUiSliderComponent } from '@smart-home/mobile/shared/ui-slider';
import { DayOfWeekPipe, TimePipe } from '@smart-home/mobile/shared/util';
import { faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SharedUiFaIconComponent } from '@smart-home/shared/ui-fa-icon';
import { HasAssignedTimePipe } from '@smart-home/mobile/scene/util';
import { TimeSelectModalFacade } from '@smart-home/mobile/shared/ui-time-select-modal';
import { first } from 'rxjs';

@Component({
  selector: 'smart-home-ui-scene-schedule',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    MobileSharedUiSliderComponent,
    DayOfWeekPipe,
    HasAssignedTimePipe,
    SharedUiFaIconComponent,
    TimePipe,
  ],
  providers: [TimeSelectModalFacade],
  templateUrl: './mobile-scene-ui-scene-schedule.component.html',
  styleUrls: ['./mobile-scene-ui-scene-schedule.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [UiSceneSchedulePresenter],
})
export class MobileSceneUiSceneScheduleComponent {
  readonly schedule$ = this.presenter.schedule$;
  readonly hasChanged$ = this.presenter.hasChanged$;
  readonly daysOfWeek = [
    DayOfWeek.Monday,
    DayOfWeek.Tuesday,
    DayOfWeek.Wednesday,
    DayOfWeek.Thursday,
    DayOfWeek.Friday,
    DayOfWeek.Saturday,
    DayOfWeek.Sunday,
  ];
  readonly CLOCK_ICON = faClock;
  readonly REMOVE_ICON = faXmark;
  @Output() update = new EventEmitter<UpdateSceneSchedulePayload>();

  constructor(
    private presenter: UiSceneSchedulePresenter,
    private timeSelectModal: TimeSelectModalFacade
  ) {}

  @Input() set schedule(schedule: UiSceneSchedule | null) {
    if (schedule !== null) this.presenter.updateSchedule(schedule);
  }

  onSelectDay(day: DayOfWeek) {
    this.presenter.changeSelectedDay(day);
  }

  onChangeTime() {
    this.timeSelectModal
      .openModal(this.presenter.selectedDayTime)
      .pipe(first())
      .subscribe((response: Time | null) => {
        if (response) this.presenter.updateTime(response);
      });
  }

  onRemoveTime() {
    this.presenter.clearTime();
  }

  onScheduleChange(event: Event) {
    this.presenter.updateActive((event as CheckboxCustomEvent).detail.checked);
  }

  onSave() {
    this.update.emit(this.presenter.updateSchedulePayload);
    this.presenter.hideSubmitButton();
  }
}
