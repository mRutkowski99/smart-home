import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CheckboxCustomEvent, SelectCustomEvent } from '@ionic/angular';
import { FromType } from '@smart-home/mobile/alarm/data-access/alarm-details-data';

@Component({
  selector: 'smart-home-logs-filter-form',
  templateUrl: './logs-filter-form.component.html',
  styleUrls: ['./logs-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsFilterFormComponent {
  @Input() onlyDanger: boolean | undefined;
  @Input() from: FromType | undefined;

  @Output() onlyDangerChange = new EventEmitter<boolean>();
  @Output() fromChange = new EventEmitter<FromType>();

  onOnlyDangerChange(event: Event) {
    const value = (event as unknown as CheckboxCustomEvent).detail.checked;
    this.onlyDangerChange.emit(value);
  }

  onFromChange(event: Event) {
    const value = (event as unknown as SelectCustomEvent).detail
      .value as FromType;
    this.fromChange.emit(value);
  }
}
