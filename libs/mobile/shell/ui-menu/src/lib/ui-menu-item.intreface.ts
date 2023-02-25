import { MenuItems } from '@smart-home/mobile/shell/util-menu-items';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface UiMenuItem {
  type: MenuItems;
  label: string;
  icon: IconDefinition;
}
