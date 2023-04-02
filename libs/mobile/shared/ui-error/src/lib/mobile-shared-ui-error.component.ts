import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'smart-home-ui-error',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './mobile-shared-ui-error.component.html',
  styleUrls: ['./mobile-shared-ui-error.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSharedUiErrorComponent {
  @Output() reload = new EventEmitter<void>();
}
