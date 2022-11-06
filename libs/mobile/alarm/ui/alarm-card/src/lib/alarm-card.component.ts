import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AlarmDto } from '@smart-home/shared/dto';
import { IconUtil } from '@smart-home/shared/utils';

export interface UpdateStateEvent {
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
  @Output() stateUpdate = new EventEmitter<UpdateStateEvent>();
  @Output() select = new EventEmitter<string>();
  @Output() defaultStateUpdate = new EventEmitter<UpdateStateEvent>();

  readonly icon = IconUtil.powerOff;

  onChangeState() {
    this.stateUpdate.emit({ id: this.alarm.id, state: !this.alarm.active });
  }

  onSelect() {
    this.select.emit(this.alarm.id);
  }

  onDefaultStateChange(event: any) {
    const state = event.detail.value === 'true';
    this.defaultStateUpdate.emit({ id: this.alarm.id, state });
  }
}
