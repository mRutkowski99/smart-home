import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AlarmsPageStore } from '@smart-home/mobile/alarm/data-access/alarms-page-data';
import { UpdateStateEvent } from '@smart-home/mobile/alarm/ui/alarm-card';

@Component({
  selector: 'smart-home-alarms-page',
  templateUrl: './alarms-page.component.html',
  styleUrls: ['./alarms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlarmsPageComponent implements OnInit {
  constructor(private readonly store: AlarmsPageStore) {}

  readonly vm$ = this.store.vm$;
  readonly selectedId$ = this.store.selectedId$;

  ngOnInit(): void {
    this.store.getAlarms();
  }

  onStateUpdate({ id, state }: UpdateStateEvent) {
    this.store.updateState({ id, state });
  }

  onUpdateStateForAll(state: boolean) {
    this.store.updateStateForAll(state);
  }

  onSelect(id: string) {
    this.store.setSelectedId(id);
  }
}
