import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeControlsComponent } from './home-controls.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { RoomCardModule } from '@smart-home/mobile/shared/ui/room-card';
import { SliderModule } from '@smart-home/mobile/shared/ui/slider';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: HomeControlsComponent }]),
    RoomCardModule,
    SliderModule,
  ],
  declarations: [HomeControlsComponent],
  exports: [HomeControlsComponent],
})
export class HomeControlsModule {}
