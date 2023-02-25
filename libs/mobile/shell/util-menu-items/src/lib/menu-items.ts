import { MenuItem } from './menu-item.interface';
import { MenuItems } from './menu-items.enum';
import {
  faCouch,
  faGear,
  faHouse,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

export const menuItems: MenuItem[] = [
  { type: MenuItems.Home, label: 'Home', url: '', icon: faHouse },
  { type: MenuItems.Rooms, label: 'Rooms', url: 'rooms', icon: faCouch },
  { type: MenuItems.Scenes, label: 'Scenes', url: 'scenes', icon: faPlay },
  {
    type: MenuItems.Settings,
    label: 'Settings',
    url: 'settings',
    icon: faGear,
  },
];
