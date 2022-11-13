import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart-home-room-details-page',
  templateUrl: './room-details-page.component.html',
  styleUrls: ['./room-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDetailsPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
