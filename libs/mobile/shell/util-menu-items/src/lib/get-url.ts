import { MenuItems } from './menu-items.enum';
import { menuItems } from './menu-items';
import { MainRoutes } from '@smart-home/mobile/shared/util-constants';

export function getUrl(type: MenuItems): string {
  return menuItems.find((menuItem) => menuItem.type)?.url ?? MainRoutes.Home;
}
