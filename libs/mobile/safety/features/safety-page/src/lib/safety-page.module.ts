import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafetyPageComponent } from './safety-page.component';
import { SafetyPageDataModule } from '@smart-home/mobile/safety/data-access/safety-page-data';
import { SectionHeaderModule } from '@smart-home/mobile/shared/ui/section-header';
import { SafetyDeviceCardModule } from '@smart-home/mobile/safety/ui/safety-device-card';
import { SkeletonModule } from '@smart-home/mobile/shared/ui/skeleton';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SafetyPageComponent }]),
    SafetyPageDataModule,
    SectionHeaderModule,
    SafetyDeviceCardModule,
    SkeletonModule,
  ],
  declarations: [SafetyPageComponent],
})
export class SafetyPageModule {}
