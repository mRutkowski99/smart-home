import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UiRoomCard } from './ui-room-card.interface';

@Component({
  selector: 'smart-home-ui-room-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './mobile-shared-room-ui-room-card.component.html',
  styleUrls: ['./mobile-shared-room-ui-room-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSharedRoomUiRoomCardComponent {
  @Input() room: UiRoomCard | undefined;
}
