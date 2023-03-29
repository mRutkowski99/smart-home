import { MenuItem } from './menu-item.interface';
import { MenuItems } from './menu-items.enum';
import {
  faCouch,
  faGear,
  faHouse,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { MainRoutes } from '@smart-home/mobile/shared/util-constants';

export const menuItems: MenuItem[] = [
  {
    type: MenuItems.Home,
    label: 'Home',
    url: MainRoutes.Home,
    icon: faHouse,
  },
  {
    type: MenuItems.Rooms,
    label: 'Rooms',
    url: MainRoutes.Rooms,
    icon: faCouch,
  },
  {
    type: MenuItems.Scenes,
    label: 'Scenes',
    url: MainRoutes.Scenes,
    icon: faPlay,
  },
  {
    type: MenuItems.Settings,
    label: 'Settings',
    url: MainRoutes.Settings,
    icon: faGear,
  },
];
