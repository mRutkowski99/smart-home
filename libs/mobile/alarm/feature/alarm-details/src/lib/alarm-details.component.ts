import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-home-alarm-details',
  templateUrl: './alarm-details.component.html',
  styleUrls: ['./alarm-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlarmDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
