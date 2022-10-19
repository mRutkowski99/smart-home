import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-home-home-controls',
  templateUrl: './home-controls.component.html',
  styleUrls: ['./home-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeControlsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
