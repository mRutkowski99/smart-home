import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UiDeviceCard } from './ui-device-card.interface';
import {
  DeviceSetpointPipe,
  StopClickPropagationDirective,
} from '@smart-home/mobile/shared/util';
import { NgClass, NgIf } from '@angular/common';
import { SharedUiFaIconComponent } from '@smart-home/shared/ui-fa-icon';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'smart-home-mobile-ui-device-card',
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    NgClass,
    DeviceSetpointPipe,
    StopClickPropagationDirective,
    SharedUiFaIconComponent,
  ],
  templateUrl: './mobile-shared-device-ui-device-card.component.html',
  styleUrls: ['./mobile-shared-device-ui-device-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSharedDeviceUiDeviceCardComponent {
  @Input() device: UiDeviceCard | undefined;
  @Input() enableRemove = false;
  @Output() select = new EventEmitter<string>();
  @Output() toggleState = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<string>();
  readonly REMOVE_ICON = faXmark;
}
