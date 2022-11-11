import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AlarmDetailsComponent } from './alarm-details.component';
import { AlarmDetailsDataModule } from '@smart-home/mobile/alarm/data-access/alarm-details-data';
import { FaIconModule } from '@smart-home/shared/ui/fa-icon';
import { SkeletonModule } from '@smart-home/mobile/shared/ui/skeleton';

@NgModule({
  imports: [
    CommonModule,
    AlarmDetailsDataModule,
    IonicModule,
    FaIconModule,
    SkeletonModule,
  ],
  declarations: [AlarmDetailsComponent],
  exports: [AlarmDetailsComponent],
})
export class AlarmDetailsModule {}
