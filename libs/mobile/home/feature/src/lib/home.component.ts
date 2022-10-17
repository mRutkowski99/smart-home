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

  slides = [1, 2, 3, 4, 5, 6, 7];
  slideOptions = {
    initialSlide: 0,
    slidesPerView: 2,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20,
  };
  // slideOptions = {
  //   slidesPerView: 'auto',
  //   spaceBetween: 30,
  // };
}
