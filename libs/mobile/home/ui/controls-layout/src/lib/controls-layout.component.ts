import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-home-controls-layout',
  templateUrl: './controls-layout.component.html',
  styleUrls: ['./controls-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
