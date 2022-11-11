import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AlarmsPageStore } from '@smart-home/mobile/alarm/data-access/alarms-page-data';
import { UpdateStateEvent } from '@smart-home/mobile/alarm/ui/alarm-card';
import { SkeletonFactory } from '@smart-home/mobile/shared/utils';

@Component({
  selector: 'smart-home-alarms-page',
  templateUrl: './alarms-page.component.html',
  styleUrls: ['./alarms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlarmsPageComponent implements OnInit {
  constructor(private readonly store: AlarmsPageStore) {}

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.store.getAlarms();
  }

  onStateUpdate({ id, state }: UpdateStateEvent) {
    this.store.updateState({ id, state });
  }

  onDefaultStateUpdate({ id, state }: UpdateStateEvent) {
    this.store.updateDefaultState({ id, state });
  }

  onUpdateStateForAll(state: boolean) {
    this.store.updateStateForAll(state);
  }

  onSelect(id: string) {
    this.store.setSelectedId(id);
  }

  onScroll(target: HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' });
  }

  readonly skeletonCards = Array.from({ length: 3 }).map(
    (_) =>
      new SkeletonFactory({ width: '100%', height: '10rem' }, [
        {
          height: '2rem',
          width: '50%',
          verticalOffset: '1rem',
          horizontalOffset: '1rem',
        },
        {
          height: '5rem',
          width: '60%',
          verticalOffset: '4rem',
          horizontalOffset: '1rem',
        },
        {
          height: '4rem',
          width: '4rem',
          verticalOffset: '3rem',
          horizontalOffset: '2rem',
          horizontalOrigin: 'rigth',
          rounded: true,
        },
      ])
  );
}
