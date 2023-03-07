import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UiMenuItem } from './ui-menu-item.intreface';
import { SharedUiFaIconComponent } from '@smart-home/shared/ui-fa-icon';
import { MenuItems } from '@smart-home/mobile/shell/util-menu-items';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'smart-home-ui-menu',
  standalone: true,
  imports: [NgIf, NgFor, IonicModule, SharedUiFaIconComponent],
  templateUrl: './mobile-shell-ui-menu.component.html',
  styleUrls: ['./mobile-shell-ui-menu.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileShellUiMenuComponent {
  @Input() name: string | undefined;
  @Input() items: UiMenuItem[] = [];
  @Output() itemSelect = new EventEmitter<MenuItems>();
  @Output() logout = new EventEmitter<void>();
  readonly logoutIcon = faArrowRightFromBracket;
}
