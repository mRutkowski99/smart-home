import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RouteUtil } from '@smart-home/mobile/shared/utils';
import { IconUtil } from '@smart-home/shared/utils/fa-icon';

interface SummaryLink {
  icon: IconDefinition;
  text: string;
  url: string;
}

@Component({
  selector: 'smart-home-summary-slider',
  templateUrl: './summary-slider.component.html',
  styleUrls: ['./summary-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummarySliderComponent {
  links: SummaryLink[] = [
    { text: 'Alarms', icon: IconUtil.alarms, url: RouteUtil.alarms },
    { text: 'Safety', icon: IconUtil.safety, url: RouteUtil.safety },
    { text: 'Power', icon: IconUtil.power, url: RouteUtil.powerUsage },
    { text: 'Water', icon: IconUtil.water, url: RouteUtil.waterUsage },
    { text: 'Gas', icon: IconUtil.gas, url: RouteUtil.gasUsage },
  ];
}
