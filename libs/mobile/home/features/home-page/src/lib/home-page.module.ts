import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-page-routing.module';
import { NotificationIconModule } from '@smart-home/mobile/home/ui/notification';
import { SummarySilderModule } from '@smart-home/mobile/home/ui/summary-silder';
import { WelcomeModule } from '@smart-home/mobile/home/ui/welcome';
import { NavModule } from '@smart-home/mobile/shared/ui/nav';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    WelcomeModule,
    NotificationIconModule,
    SummarySilderModule,
    NavModule,
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
})
export class HomePageModule {}
