import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'smart-home-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  @Input() name!: string | null;
}
