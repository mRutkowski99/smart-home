import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UiUtil } from '@smart-home/mobile/shared/utils';

@Component({
  selector: 'smart-home-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  sliderOptions = UiUtil.sliderOptions;
}
