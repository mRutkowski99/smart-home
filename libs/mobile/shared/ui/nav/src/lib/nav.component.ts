import { ChangeDetectionStrategy, Component } from '@angular/core';

interface NavItem {
  url: string;
  icon: string;
}

@Component({
  selector: 'smart-home-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  readonly navItems: NavItem[] = [
    { url: 'home', icon: 'home-sharp' },
    { url: 'rooms', icon: 'bed-sharp' },
    { url: 'scenes', icon: 'play-circle-sharp' },
    { url: 'schedule', icon: 'calendar-clear-sharp' },
    { url: 'user', icon: 'person-sharp' },
  ];
}
