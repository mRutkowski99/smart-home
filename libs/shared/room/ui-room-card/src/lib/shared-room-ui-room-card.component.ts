import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { UiRoomCard } from './ui-room-card.interface';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'smart-home-shared-room-ui-room-card',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './shared-room-ui-room-card.component.html',
  styleUrls: ['./shared-room-ui-room-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedRoomUiRoomCardComponent {
  @Input() room: UiRoomCard | undefined;
}
