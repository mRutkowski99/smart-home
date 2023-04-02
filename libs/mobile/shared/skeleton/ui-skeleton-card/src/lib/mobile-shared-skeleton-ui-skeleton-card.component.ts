import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonFactory } from '@smart-home/mobile/shared/skeleton/util-skeleton-factory';
import { IonicModule } from '@ionic/angular';

interface ContainerStyles {
  maxWidth: string;
  height: string;
}

interface ItemStyles {
  width: string;
  height: string;
  top: string;
  bottom: string;
  left: string;
  right: string;
  transformOrigin: string;
  borderRadius: string;
}

@Component({
  selector: 'smart-home-ui-skeleton-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './mobile-shared-skeleton-ui-skeleton-card.component.html',
  styleUrls: ['./mobile-shared-skeleton-ui-skeleton-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSharedSkeletonUiSkeletonCardComponent {
  container: ContainerStyles | undefined;
  items: ItemStyles[] | undefined;

  @Input() set factory(props: SkeletonFactory) {
    this.container = {
      height: props.container.height,
      maxWidth: props.container.width,
    };

    this.items = props.items.map((item) => ({
      height: item.height,
      width: item.width,
      top:
        item.verticalOrigin === 'top' || !item.verticalOrigin
          ? item.verticalOffset
          : 'initial',
      bottom:
        item.verticalOrigin === 'bottom' ? item.verticalOffset : 'initial',
      left:
        item.horizontalOrigin === 'left' || !item.horizontalOrigin
          ? item.horizontalOffset
          : 'initial',
      right:
        item.horizontalOrigin === 'right' ? item.horizontalOffset : 'initial',
      transformOrigin: item.transformOrigin || 'top left',
      borderRadius: item.rounded ? '99999px' : '0.25rem',
    }));
  }
}
