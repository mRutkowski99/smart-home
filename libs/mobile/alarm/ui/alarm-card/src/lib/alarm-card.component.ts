import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AlarmDto } from '@smart-home/shared/dto';
import { IconUtil } from '@smart-home/shared/utils';

export interface ChangeStateEvent {
  id: string;
  state: boolean;
}

@Component({
  selector: 'smart-home-alarm-card',
  templateUrl: './alarm-card.component.html',
  styleUrls: ['./alarm-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlarmCardComponent {
  @Input() alarm!: AlarmDto;
  @Output() stateChange = new EventEmitter<ChangeStateEvent>();
  @Output() select = new EventEmitter<string>();

  readonly icon = IconUtil.powerOff;

  onChangeState() {
    this.stateChange.emit({ id: this.alarm.id, state: !this.alarm.active });
  }

  onSelect() {
    this.select.emit(this.alarm.id);
  }
}
