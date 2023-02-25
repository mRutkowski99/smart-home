import { MenuItems } from './menu-items.enum';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface MenuItem {
  type: MenuItems;
  label: string;
  url: string;
  icon: IconDefinition;
}
