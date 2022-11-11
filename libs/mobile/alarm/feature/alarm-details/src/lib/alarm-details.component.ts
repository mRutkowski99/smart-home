import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  AlarmDetailsStore,
  FromType,
} from '@smart-home/mobile/alarm/data-access/alarm-details-data';
import { SkeletonFactory } from '@smart-home/mobile/shared/utils';
import { IconUtil } from '@smart-home/shared/utils';

@Component({
  selector: 'smart-home-alarm-details',
  templateUrl: './alarm-details.component.html',
  styleUrls: ['./alarm-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlarmDetailsComponent {
  constructor(private readonly store: AlarmDetailsStore) {}

  private _alarmId: string | undefined;
  readonly vm$ = this.store.vm$;
  readonly refreshIcon = IconUtil.refresh;

  @Input() set alarmId(id: string | null) {
    if (id !== null) {
      this._alarmId = id;
      this.getDetails();
    }
  }

  getDetails() {
    if (this._alarmId) this.store.getDetails(this._alarmId);
  }

  onOnlyDangerChange(event: any) {
    const value = <boolean>event.detail.checked;
    this.store.setOnlyDangerFilter(value);
  }

  onFromChange(event: any) {
    const value = <FromType>event.detail.value;
    this.store.setFromFilter(value);
  }

  readonly skeleton = new SkeletonFactory({ width: '100%', height: '15rem' }, [
    {
      width: '100%',
      height: '4rem',
      horizontalOffset: '0',
      verticalOffset: '0',
    },
    {
      height: '3rem',
      width: 'calc(100% - 4rem)',
      horizontalOffset: '2rem',
      verticalOffset: '5rem',
    },
    {
      height: '3rem',
      width: 'calc(100% - 4rem)',
      horizontalOffset: '2rem',
      verticalOffset: '9rem',
    },
  ]);
}
