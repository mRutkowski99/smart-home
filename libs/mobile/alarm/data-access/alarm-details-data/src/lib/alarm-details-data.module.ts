import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AlarmDetailsApiService } from './alarm-details-api.service';
import { AlarmDetailsStore } from './alarm-details.store';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AlarmDetailsApiService, AlarmDetailsStore],
})
export class AlarmDetailsDataModule {}
