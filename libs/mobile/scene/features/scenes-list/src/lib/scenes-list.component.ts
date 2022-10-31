import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ScenesListComponentStore } from '@smart-home/mobile/scene/data-access/scenes-list-data';
import { SkeletonFactory } from '@smart-home/mobile/shared/utils';

type Layout = 'slides' | 'grid';

@Component({
  selector: 'smart-home-scenes-list',
  templateUrl: './scenes-list.component.html',
  styleUrls: ['./scenes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenesListComponent implements OnInit {
  @Input() layout: Layout = 'slides';

  constructor(private readonly store: ScenesListComponentStore) {}

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.store.getScenes();
  }

  readonly skeletonCards = Array.from(
    { length: 5 },
    (_) =>
      new SkeletonFactory({ width: '15rem', height: '15rem' }, [
        {
          height: '1.6rem',
          width: '13rem',
          horizontalOffset: '1rem',
          verticalOffset: '1rem',
        },
        {
          height: '1.6rem',
          width: '13rem',
          horizontalOffset: '1rem',
          verticalOffset: '3.6rem',
        },
        {
          height: '4rem',
          width: '13rem',
          horizontalOffset: '1rem',
          verticalOffset: '7rem',
        },
      ])
  );
}
