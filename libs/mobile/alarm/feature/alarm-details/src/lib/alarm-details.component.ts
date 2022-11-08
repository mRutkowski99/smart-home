import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AlarmDetailsStore } from '@smart-home/mobile/alarm/data-access/alarm-details-data';
import { IconUtil } from '@smart-home/shared/utils';

@Component({
  selector: 'smart-home-alarm-details',
  templateUrl: './alarm-details.component.html',
  styleUrls: ['./alarm-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlarmDetailsComponent {
  constructor(private readonly store: AlarmDetailsStore) {}

  readonly vm$ = this.store.vm$;
  readonly refreshIcon = IconUtil.refresh;

  @Input() set alarmId(id: string | null) {
    if (id !== null) this.store.getDetails(id);
  }
}
