import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SafetyPageApiService } from './safety-page-api.service';
import { SafetyPageStore } from './safety-page.store';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [SafetyPageApiService, SafetyPageStore],
})
export class SafetyPageDataModule {}
