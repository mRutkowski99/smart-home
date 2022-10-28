import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummarySliderComponent } from './summary-slider.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SliderModule } from '@smart-home/mobile/shared/ui/slider';
import { FaIconModule } from '@smart-home/shared/ui/fa-icon';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    SliderModule,
    FaIconModule,
  ],
  declarations: [SummarySliderComponent],
  exports: [SummarySliderComponent],
})
export class SummarySilderModule {}
