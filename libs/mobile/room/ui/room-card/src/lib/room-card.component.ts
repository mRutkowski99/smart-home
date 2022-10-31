import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RoomOverviewDto } from '@smart-home/shared/dto';

@Component({
  selector: 'smart-home-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardComponent {
  @Input() room!: RoomOverviewDto | null;
}
