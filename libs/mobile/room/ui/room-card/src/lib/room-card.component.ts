import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export interface RoomCard {
  id: number;
  name: string;
  devices: number;
  img: string;
  temperature?: number;
}

export interface TemperatureChangeEvent {
  roomId: number;
  value: number;
}

@Component({
  selector: 'smart-home-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardComponent {
  @Input() room!: RoomCard | null;
  @Output() temperatureChange = new EventEmitter<TemperatureChangeEvent>();
}
