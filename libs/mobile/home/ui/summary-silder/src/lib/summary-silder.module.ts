import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummarySliderComponent } from './summary-slider.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [SummarySliderComponent],
  exports: [SummarySliderComponent],
})
export class SummarySilderModule {}
