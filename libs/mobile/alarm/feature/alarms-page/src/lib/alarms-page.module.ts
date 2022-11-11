import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AlarmsPageComponent } from './alarms-page.component';
import { SectionHeaderModule } from '@smart-home/mobile/shared/ui/section-header';
import { AlarmCardModule } from '@smart-home/mobile/alarm/ui/alarm-card';
import { AlarmsPageDataModule } from '@smart-home/mobile/alarm/data-access/alarms-page-data';
import { AlarmDetailsModule } from '../../../alarm-details/src/lib/alarm-details.module';
import { SkeletonModule } from '@smart-home/mobile/shared/ui/skeleton';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: AlarmsPageComponent }]),
    AlarmsPageDataModule,
    SectionHeaderModule,
    AlarmCardModule,
    AlarmDetailsModule,
    SkeletonModule,
  ],
  declarations: [AlarmsPageComponent],
  exports: [AlarmsPageComponent],
})
export class AlarmsPageModule {}
