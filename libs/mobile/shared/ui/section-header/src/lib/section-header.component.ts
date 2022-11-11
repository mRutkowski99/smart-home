import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Location } from '@angular/common';
import { IconUtil } from '@smart-home/shared/utils';

@Component({
  selector: 'smart-home-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  @Input() title: string | undefined;
  @Input() showNavigation = true;
  @Input() showFavourite = false;
  @Input() isFavourite = false;

  @Output() favouriteChange = new EventEmitter<boolean>();

  readonly navigateBackIcon = IconUtil.chevronLeft;

  constructor(private readonly location: Location) {}

  navigateBack() {
    if (this.showNavigation) this.location.back();
  }

  changeFavourite() {
    if (this.showFavourite) this.favouriteChange.emit(!this.isFavourite);
  }
}
