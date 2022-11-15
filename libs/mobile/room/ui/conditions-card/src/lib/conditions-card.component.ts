import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'smart-home-conditions-card',
  templateUrl: './conditions-card.component.html',
  styleUrls: ['./conditions-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionsCardComponent {
  @Input() title: string | undefined;
  @Input() value: string | undefined;
  @Input() icon: IconDefinition | undefined;
}
