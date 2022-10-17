import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-home-summary-slider',
  templateUrl: './summary-slider.component.html',
  styleUrls: ['./summary-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummarySliderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
