import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MobileShellUiHeaderComponent } from '@smart-home/mobile/shell/ui-header';
import { MobileShellUiMenuComponent } from '@smart-home/mobile/shell/ui-menu';
import {
  createRouteLabelObservable,
  getUrl,
  MenuItems,
  menuItems,
} from '@smart-home/mobile/shell/util-menu-items';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'smart-home-mobile-shell-feature',
  standalone: true,
  imports: [
    AsyncPipe,
    IonicModule,
    MobileShellUiHeaderComponent,
    MobileShellUiMenuComponent,
    RouterOutlet,
  ],
  templateUrl: './mobile-shell-feature.component.html',
  styleUrls: ['./mobile-shell-feature.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileShellFeatureComponent {
  readonly menuItems = [...menuItems];
  routeLabel$ = createRouteLabelObservable(this.router);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  onNavigate(selectedItemType: MenuItems) {
    this.router.navigate(['/', getUrl(selectedItemType)]);
  }

  onLogout() {
    //todo: handle logout
  }
}
