import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RoomDetailsStore } from '@smart-home/mobile/room/data-access/room-details-data';
import { IconUtil } from '@smart-home/shared/utils';

@Component({
  selector: 'smart-home-room-details-page',
  templateUrl: './room-details-page.component.html',
  styleUrls: ['./room-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDetailsPageComponent implements OnInit {
  constructor(private readonly store: RoomDetailsStore) {}

  readonly vm$ = this.store.vm$;
  readonly temperatureIcon = IconUtil.temperature;
  readonly humidityIcon = IconUtil.humidity;

  ngOnInit(): void {
    this.store.getRoom();
  }
}
