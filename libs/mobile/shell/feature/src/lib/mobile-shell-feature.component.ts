import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'smart-home-mobile-shell-feature',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './mobile-shell-feature.component.html',
  styleUrls: ['./mobile-shell-feature.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileShellFeatureComponent {}
