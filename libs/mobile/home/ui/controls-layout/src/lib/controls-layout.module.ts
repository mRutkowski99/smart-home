import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsLayoutComponent } from './controls-layout.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SliderModule } from '@smart-home/mobile/shared/ui/slider';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ControlsLayoutComponent }]),
    SliderModule,
  ],
  declarations: [ControlsLayoutComponent],
})
export class ControlsLayoutModule {}
