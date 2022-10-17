import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { WelcomeModule } from '@smart-home/mobile/home/ui/welcome';
import { NotificationIconModule } from 'libs/mobile/home/ui/notification/src';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    WelcomeModule,
    NotificationIconModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
