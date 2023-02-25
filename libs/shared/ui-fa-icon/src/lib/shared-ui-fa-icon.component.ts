import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

type IconSize = '2xs' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'smart-home-ui-fa-icon',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './shared-ui-fa-icon.component.html',
  styleUrls: ['./shared-ui-fa-icon.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiFaIconComponent {
  @Input() icon!: IconDefinition;
  @Input() size: IconSize = 'lg';
  @Input() stroke: string | undefined;
  @Input() color: string | undefined;
}
