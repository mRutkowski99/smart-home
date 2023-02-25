import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'smart-home-ui-header',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './mobile-shell-ui-header.component.html',
  styleUrls: ['./mobile-shell-ui-header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileShellUiHeaderComponent {
  @Input() title = '';
}
