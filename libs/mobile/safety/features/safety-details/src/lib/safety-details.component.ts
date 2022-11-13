import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FromType } from '@smart-home/mobile/alarm/data-access/alarm-details-data';
import { SafetyDetailsStore } from '@smart-home/mobile/safety/data-access/safety-details-data';
import { SkeletonFactory } from '@smart-home/mobile/shared/utils';
import { IconUtil } from '@smart-home/shared/utils';

@Component({
  selector: 'smart-home-safety-details',
  templateUrl: './safety-details.component.html',
  styleUrls: ['./safety-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyDetailsComponent {
  constructor(private readonly store: SafetyDetailsStore) {}

  private id: string | undefined;
  readonly vm$ = this.store.vm$;
  readonly refreshIcon = IconUtil.refresh;

  @Input() set safetyId(id: string | null) {
    if (id !== null) {
      this.id = id;
      this.getDetails();
    }
  }

  getDetails() {
    if (this.id !== undefined) this.store.getDetails(this.id);
  }

  onOnlyDangerChange(value: boolean) {
    this.store.setOnlyDangerFilter(value);
  }

  onFromChange(value: FromType) {
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
