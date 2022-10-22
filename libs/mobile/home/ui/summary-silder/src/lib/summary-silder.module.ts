import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummarySliderComponent } from './summary-slider.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SliderModule } from '@smart-home/mobile/shared/ui/slider';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule, SliderModule],
  declarations: [SummarySliderComponent],
  exports: [SummarySliderComponent],
})
export class SummarySilderModule {}
