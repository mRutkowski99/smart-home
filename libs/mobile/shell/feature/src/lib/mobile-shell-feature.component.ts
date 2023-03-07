import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MobileShellUiHeaderComponent } from '@smart-home/mobile/shell/ui-header';
import { MobileShellUiMenuComponent } from '@smart-home/mobile/shell/ui-menu';
import { MenuItems, menuItems } from '@smart-home/mobile/shell/util-menu-items';

@Component({
  selector: 'smart-home-mobile-shell-feature',
  standalone: true,
  imports: [
    IonicModule,
    MobileShellUiHeaderComponent,
    MobileShellUiMenuComponent,
  ],
  templateUrl: './mobile-shell-feature.component.html',
  styleUrls: ['./mobile-shell-feature.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileShellFeatureComponent {
  menuItems = [...menuItems];

  onNavigate(selectedItemType: MenuItems) {
    //todo: handle navigation
  }

  onLogout() {
    //todo: handle logout
  }
}
