import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedUiFaIconComponent } from '@smart-home/shared/ui-fa-icon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'smart-home-mobile-room-ui-icon-card',
  standalone: true,
  imports: [IonicModule, SharedUiFaIconComponent, NgIf],
  templateUrl: './mobile-room-ui-icon-card.component.html',
  styleUrls: ['./mobile-room-ui-icon-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileRoomUiIconCardComponent {
  @Input() icon: IconDefinition | undefined;
  @Input() value: number | string = '--';
}
