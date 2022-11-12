import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SafetyDetailsApiService } from './safety-details-api.service';
import { SafetyDetailsStore } from './safety-details.store';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [SafetyDetailsApiService, SafetyDetailsStore],
})
export class SafetyDetailsDataModule {}
