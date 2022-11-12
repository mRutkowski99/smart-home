import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SafetyPageApiService } from './safety-page-api.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [SafetyPageApiService],
})
export class SafetyPageDataModule {}
