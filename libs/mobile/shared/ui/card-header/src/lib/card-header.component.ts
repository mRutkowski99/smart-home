import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconUtil } from '@smart-home/shared/utils';

@Component({
  selector: 'smart-home-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  @Input() title: string | undefined;
  @Output() refresh = new EventEmitter<void>();

  readonly refreshIcon = IconUtil.refresh;

  onRefresh() {
    this.refresh.emit();
  }
}
