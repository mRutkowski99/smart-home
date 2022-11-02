import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-home-alarms-page',
  templateUrl: './alarms-page.component.html',
  styleUrls: ['./alarms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlarmsPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
