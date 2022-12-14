import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafetyDetailsComponent } from './safety-details.component';
import { IonicModule } from '@ionic/angular';
import { SkeletonModule } from '@smart-home/mobile/shared/ui/skeleton';
import { SafetyDetailsDataModule } from '@smart-home/mobile/safety/data-access/safety-details-data';
import { CardHeaderModule } from '@smart-home/mobile/shared/ui/card-header';
import { LogsFilterFormModule } from '@smart-home/mobile/shared/ui/logs-filter-form';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SafetyDetailsDataModule,
    CardHeaderModule,
    LogsFilterFormModule,
    SkeletonModule,
  ],
  declarations: [SafetyDetailsComponent],
  exports: [SafetyDetailsComponent],
})
export class SafetyDetailsModule {}
