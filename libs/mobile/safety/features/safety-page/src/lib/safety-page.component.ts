import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SafetyPageStore } from '@smart-home/mobile/safety/data-access/safety-page-data';
import { SkeletonFactory } from '@smart-home/mobile/shared/utils';

@Component({
  selector: 'smart-home-safety-page',
  templateUrl: './safety-page.component.html',
  styleUrls: ['./safety-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyPageComponent implements OnInit {
  constructor(private readonly store: SafetyPageStore) {}

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.store.getSafetyDevices();
  }

  onSelect(id: string) {
    this.store.setSelectedId(id);
  }

  readonly skeletonCards = Array.from({ length: 3 }).map(
    (_) =>
      new SkeletonFactory({ width: '100%', height: '11rem' }, [
        {
          width: '40%',
          height: '2rem',
          horizontalOffset: '1rem',
          verticalOffset: '1rem',
        },
        {
          width: '75%',
          height: '3rem',
          horizontalOffset: '1rem',
          verticalOffset: '4rem',
        },
        {
          width: 'calc(100% - 2rem)',
          height: '2rem',
          horizontalOffset: '1rem',
          verticalOffset: '1rem',
          verticalOrigin: 'bottom',
        },
      ])
  );
}
