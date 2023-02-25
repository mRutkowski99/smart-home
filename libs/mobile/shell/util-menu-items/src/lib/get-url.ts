import { MenuItems } from './menu-items.enum';
import { menuItems } from './menu-items';

// Option 'Home' as default
export function getUrl(type: MenuItems): string {
  return menuItems.find((menuItem) => menuItem.type)?.url ?? '';
}
