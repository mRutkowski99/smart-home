import {
  ChangeDetectionStrategy,
  Component, EventEmitter, Input, Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {AlarmOverviewVm} from "@smart-home/shared/alarm/util-alarm-vm";
import {AlarmStatusPipe} from "@smart-home/mobile/alarm/util";
import {SharedUiFaIconComponent} from "@smart-home/shared/ui-fa-icon";
import {faLock, faLockOpen} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'smart-home-ui-alarm-card',
  standalone: true,
  imports: [CommonModule, IonicModule, AlarmStatusPipe, SharedUiFaIconComponent],
  templateUrl: './mobile-alarm-ui-alarm-card.component.html',
  styleUrls: ['./mobile-alarm-ui-alarm-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAlarmUiAlarmCardComponent {
  @Input() alarm?: AlarmOverviewVm | null
  @Output() changeState = new EventEmitter<{id: string, value: boolean}>()
  readonly LOCK_ICON = faLock
  readonly UNLOCK_ICON = faLockOpen
}
