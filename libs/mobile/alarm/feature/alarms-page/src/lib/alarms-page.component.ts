import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AlarmsPageStore } from '@smart-home/mobile/alarm/data-access/alarms-page-data';

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
}
