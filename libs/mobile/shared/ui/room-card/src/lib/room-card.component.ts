import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface RoomCard {
  id: number;
  name: string;
  devices: number;
  img: string;
}

@Component({
  selector: 'smart-home-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardComponent {
  @Input() room!: RoomCard | null;
}
