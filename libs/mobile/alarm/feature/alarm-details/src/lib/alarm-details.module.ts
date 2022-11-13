import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AlarmDetailsComponent } from './alarm-details.component';
import { AlarmDetailsDataModule } from '@smart-home/mobile/alarm/data-access/alarm-details-data';
import { SkeletonModule } from '@smart-home/mobile/shared/ui/skeleton';
import { CardHeaderModule } from '@smart-home/mobile/shared/ui/card-header';
import { LogsFilterFormModule } from '@smart-home/mobile/shared/ui/logs-filter-form';

@NgModule({
  imports: [
    CommonModule,
    AlarmDetailsDataModule,
    IonicModule,
    SkeletonModule,
    CardHeaderModule,
    LogsFilterFormModule,
  ],
  declarations: [AlarmDetailsComponent],
  exports: [AlarmDetailsComponent],
})
export class AlarmDetailsModule {}
