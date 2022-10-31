import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SceneOverviewDto } from '@smart-home/shared/dto';
import { IconUtil } from '@smart-home/shared/utils';

@Component({
  selector: 'smart-home-scene-card',
  templateUrl: './scene-card.component.html',
  styleUrls: ['./scene-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneCardComponent {
  @Input() scene!: SceneOverviewDto;

  readonly clockIcon = IconUtil.clock;
}
