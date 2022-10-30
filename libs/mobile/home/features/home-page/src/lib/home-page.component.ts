import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IconUtil } from '@smart-home/shared/utils';

@Component({
  selector: 'smart-home-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  readonly arrowIcon = IconUtil.arrowRigth;
}
