import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SkeletonFactory } from '@smart-home/mobile/shared/utils';

interface ContainerStyles {
  width: string;
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
  selector: 'smart-home-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  @Input()
  set factory(props: SkeletonFactory) {
    this.containerStyle = {
      height: props.container.height,
      width: props.container.width,
    };

    this.itemsStyles = props.items.map((item) => ({
      height: item.height,
      width: item.width,
      top: item.verticalOrigin === 'top' ? item.verticalOffset : 'initial',
      bottom:
        item.verticalOrigin === 'bottom' ? item.verticalOffset : 'initial',
      left:
        item.horizontalOrigin === 'left' ? item.horizontalOffset : 'initial',
      right:
        item.horizontalOrigin === 'rigth' ? item.horizontalOffset : 'initial',
      transformOrigin: item.transformOrigin || 'top left',
      borderRadius: item.rounded ? '99999px' : '0.25rem',
    }));
  }

  containerStyle!: ContainerStyles;
  itemsStyles!: ItemStyles[];
}
