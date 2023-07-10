import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "@smart-home/web/data-access";

@Component({
  selector: 'smart-home-web-shell',
  templateUrl: './web-shell.component.html',
  styleUrls: ['./web-shell.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebShellComponent {
  constructor(private authService: AuthService) {
  }
  readonly LOGOUT_ICON = faRightFromBracket

  onLogout() {
    this.authService.logout();
  }
}
