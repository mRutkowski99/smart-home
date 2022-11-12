import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafetyPageComponent } from './safety-page.component';
import { SafetyPageDataModule } from '@smart-home/mobile/safety/data-access/safety-page-data';
import { SectionHeaderModule } from '@smart-home/mobile/shared/ui/section-header';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SafetyPageComponent }]),
    SafetyPageDataModule,
    SectionHeaderModule,
  ],
  declarations: [SafetyPageComponent],
})
export class SafetyPageModule {}
