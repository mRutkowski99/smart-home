import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface SceneCard {
  name: string;
  active: boolean;
  id: number;
}

@Component({
  selector: 'smart-home-scene-card',
  templateUrl: './scene-card.component.html',
  styleUrls: ['./scene-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneCardComponent {
  @Input() scene!: SceneCard;
}
