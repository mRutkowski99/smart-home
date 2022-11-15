import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-home-rooms-list-page',
  templateUrl: './rooms-list-page.component.html',
  styleUrls: ['./rooms-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
