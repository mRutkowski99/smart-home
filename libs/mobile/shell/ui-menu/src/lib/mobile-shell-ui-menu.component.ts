import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IonicModule, IonMenu } from '@ionic/angular';
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
  readonly logoutIcon = faArrowRightFromBracket;
  @Input() name: string | undefined;
  @Input() items: UiMenuItem[] = [];
  @Output() itemSelect = new EventEmitter<MenuItems>();
  @Output() logout = new EventEmitter<void>();

  private _menu: IonMenu | undefined;

  @ViewChild('menu') set menu(menu: IonMenu) {
    this._menu = menu;
  }

  onSelect(item: MenuItems) {
    this.itemSelect.emit(item);

    if (this._menu) this._menu.close();
  }
}
