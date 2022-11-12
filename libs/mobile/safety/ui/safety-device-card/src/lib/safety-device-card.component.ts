import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SafetyDto } from '@smart-home/shared/dto';

@Component({
  selector: 'smart-home-safety-device-card',
  templateUrl: './safety-device-card.component.html',
  styleUrls: ['./safety-device-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyDeviceCardComponent {
  @Input() device!: SafetyDto | null;
  @Output() select = new EventEmitter<string>();

  onSelect() {
    this.select.emit(this.device!.id);
  }
}
