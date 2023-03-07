import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smart-home-mobile-home-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-home-feature.component.html',
  styleUrls: ['./mobile-home-feature.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHomeFeatureComponent {}
