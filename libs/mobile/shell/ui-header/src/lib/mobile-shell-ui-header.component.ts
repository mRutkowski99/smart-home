import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'smart-home-ui-header',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './mobile-shell-ui-header.component.html',
  styleUrls: ['./mobile-shell-ui-header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileShellUiHeaderComponent {
  @Input() title = '';
}
