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

@Component({
  selector: 'smart-home-mobile-ui-device-card',
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    NgClass,
    DeviceSetpointPipe,
    StopClickPropagationDirective,
  ],
  templateUrl: './mobile-shared-device-ui-device-card.component.html',
  styleUrls: ['./mobile-shared-device-ui-device-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSharedDeviceUiDeviceCardComponent {
  @Input() device: UiDeviceCard | undefined;
  @Output() select = new EventEmitter<string>();
  @Output() toggleState = new EventEmitter<boolean>();
}
