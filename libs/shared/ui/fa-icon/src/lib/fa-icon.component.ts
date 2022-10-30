import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type IconSize = '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'smart-home-fa-icon',
  templateUrl: './fa-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaIconComponent {
  @Input() icon!: IconDefinition;
  @Input() size: IconSize = 'lg';
}
