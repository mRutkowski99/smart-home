import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'smart-home-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationIconComponent {
  @Input() hasNotifications: boolean | null = false;
}
