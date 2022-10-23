import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { NotificationIconModule } from '@smart-home/mobile/home/ui/notification';
import { SummarySilderModule } from '@smart-home/mobile/home/ui/summary-silder';
import { WelcomeModule } from '@smart-home/mobile/home/ui/welcome';
import { NavModule } from '@smart-home/mobile/shared/ui/nav';
import { SliderModule } from '@smart-home/mobile/shared/ui/slider';
import { RoomCardModule } from '@smart-home/mobile/shared/ui/room-card';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: HomePageComponent }]),
    WelcomeModule,
    NotificationIconModule,
    SummarySilderModule,
    NavModule,
    SliderModule,
    RoomCardModule,
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
})
export class HomePageModule {}
