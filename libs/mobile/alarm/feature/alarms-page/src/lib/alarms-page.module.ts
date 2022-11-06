import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AlarmsPageComponent } from './alarms-page.component';
import { SectionHeaderModule } from '@smart-home/mobile/shared/ui/section-header';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: AlarmsPageComponent }]),
    SectionHeaderModule,
  ],
  declarations: [AlarmsPageComponent],
  exports: [AlarmsPageComponent],
})
export class AlarmsPageModule {}
