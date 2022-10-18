import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UiUtil } from '@smart-home/shared/utils';

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

  readonly sliderOptions = UiUtil.sliderOptions;
}
