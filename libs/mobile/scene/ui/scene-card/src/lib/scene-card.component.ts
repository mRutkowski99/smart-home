import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconUtil } from '@smart-home/shared/utils';

export interface SceneCard {
  id: number;
  name: string;
  active: boolean;
  schedule?: string;
  favourite: boolean;
}

@Component({
  selector: 'smart-home-scene-card',
  templateUrl: './scene-card.component.html',
  styleUrls: ['./scene-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneCardComponent {
  @Input() scene!: SceneCard;

  readonly clockIcon = IconUtil.clock;
}
