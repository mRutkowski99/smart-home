import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconUtil } from '@smart-home/shared/utils/fa-icon';

@Component({
  selector: 'smart-home-favourite-icon',
  templateUrl: './favourite-icon.component.html',
  styleUrls: ['./favourite-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteIconComponent implements OnChanges {
  @Input() isFavourite = false;
  icon!: IconDefinition;

  ngOnChanges(changes: SimpleChanges): void {
    this.icon = this.isFavourite ? IconUtil.starSolid : IconUtil.starRegular;
  }
}
