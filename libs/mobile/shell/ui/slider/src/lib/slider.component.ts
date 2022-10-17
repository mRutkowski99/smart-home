import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { defer, from, Observable } from 'rxjs';

@Component({
  selector: 'smart-home-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements AfterViewInit {
  slides = [1, 2, 3, 4, 5, 6, 7];
  slideOptions = {
    slidesPerView: 'auto',
    spaceBetween: 20,
  };

  @ViewChild('slider', { static: true }) slider!: IonSlides;

  ngAfterViewInit(): void {
    const x = defer(() => from(this.slider.getActiveIndex())).subscribe((x) =>
      console.log(x)
    );
  }
}
