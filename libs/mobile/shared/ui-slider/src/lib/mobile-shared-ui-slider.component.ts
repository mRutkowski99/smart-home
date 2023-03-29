import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'smart-home-ui-slider',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './mobile-shared-ui-slider.component.html',
  styleUrls: ['./mobile-shared-ui-slider.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSharedUiSliderComponent {
  readonly sliderOptions = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    freeMode: true,
  };
}
