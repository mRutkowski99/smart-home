import {
  faPlug,
  faDroplet,
  faFireFlameSimple,
  faHouseLock,
  faShieldHeart,
  faStar as starSolid,
  faClock,
  faArrowRight,
  faChevronLeft,
  faPowerOff,
  faArrowsRotate,
  faTemperature3,
  faFaucetDrip,
} from '@fortawesome/free-solid-svg-icons';

import { faStar as starRegular } from '@fortawesome/free-regular-svg-icons';

export class IconUtil {
  static power = faPlug;
  static water = faFaucetDrip;
  static gas = faFireFlameSimple;
  static alarms = faHouseLock;
  static safety = faShieldHeart;
  static clock = faClock;
  static starSolid = starSolid;
  static starRegular = starRegular;
  static arrowRigth = faArrowRight;
  static chevronLeft = faChevronLeft;
  static powerOff = faPowerOff;
  static refresh = faArrowsRotate;
  static temperature = faTemperature3;
  static humidity = faDroplet;
}
