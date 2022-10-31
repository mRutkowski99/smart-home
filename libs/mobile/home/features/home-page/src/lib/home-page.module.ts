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
import { FaIconModule } from '@smart-home/shared/ui/fa-icon';
import { RoomsListModule } from '@smart-home/mobile/room/features/rooms-list';
import { ScenesListModule } from '@smart-home/mobile/scene/features/scenes-list';

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
    FaIconModule,
    RoomsListModule,
    ScenesListModule,
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
})
export class HomePageModule {}
