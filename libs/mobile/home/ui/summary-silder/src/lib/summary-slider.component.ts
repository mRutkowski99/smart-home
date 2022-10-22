import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface Summary {
  value: string | boolean;
  text: string;
  url: string;
}

@Component({
  selector: 'smart-home-summary-slider',
  templateUrl: './summary-slider.component.html',
  styleUrls: ['./summary-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummarySliderComponent {
  @Input() items!: Summary[] | null;
}
