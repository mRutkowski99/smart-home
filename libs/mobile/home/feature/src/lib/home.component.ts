import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  summaries = [
    { value: true, text: 'Alarms', url: 'alarms' },
    { value: false, text: 'Security', url: 'security' },
    { value: '25', text: 'Sunny', url: 'weather' },
    { value: '12 ', text: 'Power', url: 'power' },
    { value: '8 ', text: 'Water', url: 'water' },
    { value: '9 ', text: 'Gas', url: 'gas' },
  ];
}
